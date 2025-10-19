import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as os from 'os'

function getPlatform(): string {
  const platform = os.platform()
  switch (platform) {
    case 'linux':
      return 'linux'
    case 'darwin':
      return 'darwin'
    case 'win32':
      return 'windows'
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }
}

function getArchitecture(): string {
  const arch = os.arch()
  switch (arch) {
    case 'x64':
      return 'amd64'
    case 'arm64':
      return 'arm64'
    default:
      throw new Error(`Unsupported architecture: ${arch}`)
  }
}

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    const platform = getPlatform()
    const arch = getArchitecture()

    core.debug(
      `Setting up Oasis CLI version: ${version} for ${platform}_${arch}...`
    )

    const platformArch = `${platform}_${arch}`
    const filename = `oasis_cli_${version}_${platformArch}.tar.gz`
    const downloadUrl = `https://github.com/oasisprotocol/cli/releases/download/v${version}/${filename}`

    // Download the specific version of the tool, e.g. as a tarball
    const pathToTarball = await tc.downloadTool(downloadUrl)

    // Extract the tarball onto the runner
    const pathToCLI = await tc.extractTar(pathToTarball)

    // Expose the tool by adding it to the PATH
    core.addPath(`${pathToCLI}/oasis_cli_${version}_${platformArch}`)

    core.debug(`Oasis CLI version: ${version} ready to use.`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
