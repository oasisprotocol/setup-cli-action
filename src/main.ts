import * as core from '@actions/core'
import { wait } from './wait.js'

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

module.exports = setup

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Log the current timestamp, wait, then log the new timestamp
    const version = core.getInput('version');
    core.debug(`Setting up Oasis CLI version: ${version} ...`)

    // Download the specific version of the tool, e.g. as a tarball
    const pathToTarball = await tc.downloadTool(`https://github.com/oasisprotocol/cli/releases/download/v${version}/oasis_cli_${version}_linux_amd64.tar.gz`);

    // Extract the tarball onto the runner
    const pathToCLI = await tc.extractTar(pathToTarball);

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI)

    // Set outputs for other workflow steps to use
    core.debug(`Oasis CLI version: ${version} ready to use.`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
