import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

const TOOL_NAME = 'FortifyVulnerabilityExporter';

async function main(): Promise<void> {
  try {
    const javaPath: string = await io.which('java', true)
    let url = 'https://github.com/fortify/FortifyVulnerabilityExporter/releases/latest/download/FortifyVulnerabilityExporter.zip'
    core.debug("Downloading " + url);
    const toolZip = await tc.downloadTool(url);
    core.debug("Extracting " + toolZip);
    const toolDir = await tc.extractZip(toolZip);

    await exec.exec(`"${javaPath}"`, ['-jar', 'FortifyVulnerabilityExporter.jar'], {
      cwd: toolDir
    });
  } catch (error) {
    core.setFailed(error.message);
  } finally {
    core.endGroup();
  }
}

main();
