# Oasis CLI GitHub Action

A GitHub Action to install and run the [Oasis CLI] within your workflows,
enabling seamless interaction with the [Oasis] technologies from your CI/CD
pipelines.

[Oasis CLI]: https://docs.oasis.io/build/tools/cli/
[Oasis]: https://oasis.net/

## Usage

To use the Oasis CLI GitHub Action, just add the following to your GitHub
Actions workflow:

```yaml
steps:
  - name: Setup Oasis CLI
    uses: oasisprotocol/setup-cli-action
```

## About Oasis CLI

The Oasis CLI is a powerful command-line tool for interacting with the Oasis
network, including [Oasis Sapphire], enabling developers, validators, and users
to manage accounts, deploy smart contracts, query network data, and perform
blockchain operations efficiently from the terminal.

It also support creating, building and deploying your application inside
[Oasis ROFL], the Oasis trusted execution environment.

[Oasis Sapphire]: https://docs.oasis.io/build/sapphire/
[Oasis ROFL]: https://docs.oasis.io/build/rofl/

## License

This project is licensed under the Apache License 2.0. See the
[LICENSE](LICENSE) file for details.

This project is a fork of [GitHub Actions TypeScript template], which was
licensed under the MIT License. The original license and copyright notice are
preserved in the [LICENSE-MIT](LICENSE-MIT) file.

[GitHub Actions TypeScript template]:
  https://github.com/actions/typescript-action
