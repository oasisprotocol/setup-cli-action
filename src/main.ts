import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

module.exports = setup

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version = core.getInput('version')
    core.debug(`Setting up Oasis CLI version: ${version} ...`)

    // Download the specific version of the tool, e.g. as a tarball
    const pathToTarball = await tc.downloadTool(
      `https://github.com/oasisprotocol/cli/releases/download/v${version}/oasis_cli_${version}_linux_amd64.tar.gz`
    )

    // Extract the tarball onto the runner
    const pathToCLI = await tc.extractTar(pathToTarball)

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI)

    core.debug(`Oasis CLI version: ${version} ready to use.`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
