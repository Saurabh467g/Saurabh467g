import { GitHubUser, GitHubRepo, GitHubEvent } from '../types';

export interface PushResult {
  success: boolean;
  message: string;
  commitSha?: string;
  repoUrl?: string;
  fileUrl?: string;
}

/**
 * Directly pushes a file (e.g. README.md) or full profile repo to GitHub using the GitHub REST API.
 * Uses the personal access token (classic or fine-grained with 'repo' or 'contents:write' scope).
 */
export async function pushReadmeToGitHub(params: {
  token: string;
  username: string;
  repoName: string;
  filePath: string;
  content: string;
  commitMessage: string;
}): Promise<PushResult> {
  const { token, username, repoName, filePath, content, commitMessage } = params;

  if (!token) {
    throw new Error('GitHub Personal Access Token is required to push to GitHub.');
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Step 1: Check if the repository exists, or create it if not
  const repoCheckUrl = `https://api.github.com/repos/${username}/${repoName}`;
  const repoCheckRes = await fetch(repoCheckUrl, { headers });

  if (repoCheckRes.status === 404) {
    // Attempt to automatically create the special profile repository!
    const createRepoRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: repoName,
        description: `GitHub Profile configuration and interactive showcase for @${username}`,
        private: false,
        auto_init: true,
      }),
    });

    if (!createRepoRes.ok) {
      const errJson = await createRepoRes.json().catch(() => ({}));
      throw new Error(
        `Could not create repository "${repoName}". ${errJson.message || `HTTP ${createRepoRes.status}`}. Please create it manually or ensure token has 'repo' scope.`
      );
    }

    // Wait a brief 1.5s for GitHub backend git initialization
    await new Promise((resolve) => setTimeout(resolve, 1500));
  } else if (!repoCheckRes.ok && repoCheckRes.status !== 200) {
    const errJson = await repoCheckRes.json().catch(() => ({}));
    throw new Error(`Repository check failed: ${errJson.message || `HTTP ${repoCheckRes.status}`}`);
  }

  // Step 2: Check if file already exists in the repository to retrieve its SHA (required by GitHub for updates)
  const fileUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`;
  let existingSha: string | undefined = undefined;

  try {
    const fileRes = await fetch(fileUrl, { headers });
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      existingSha = fileData.sha;
    }
  } catch (e) {
    // New file, proceed without existingSha
  }

  // Step 3: Base64 encode the Unicode content
  const utf8Bytes = new TextEncoder().encode(content);
  let binaryString = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryString += String.fromCharCode(utf8Bytes[i]);
  }
  const base64Content = btoa(binaryString);

  // Step 4: Create or update file on GitHub
  const putBody: any = {
    message: commitMessage || `Update ${filePath} via GitShowcase Studio`,
    content: base64Content,
  };
  if (existingSha) {
    putBody.sha = existingSha;
  }

  const putRes = await fetch(fileUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody),
  });

  if (!putRes.ok) {
    const errJson = await putRes.json().catch(() => ({}));
    if (putRes.status === 401 || putRes.status === 403) {
      throw new Error(
        `Permission denied (HTTP ${putRes.status}). Please ensure your GitHub Token has 'repo' or 'contents:write' permission.`
      );
    }
    throw new Error(`Failed to push to GitHub: ${errJson.message || `HTTP ${putRes.status}`}`);
  }

  const resultData = await putRes.json();

  return {
    success: true,
    message: `Successfully pushed ${filePath} directly to github.com/${username}/${repoName}!`,
    commitSha: resultData?.commit?.sha,
    repoUrl: `https://github.com/${username}/${repoName}`,
    fileUrl: `https://github.com/${username}/${repoName}/blob/main/${filePath}`,
  };
}
