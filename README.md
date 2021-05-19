# Tutor Base

Tutor Base is website designed to match Tutors and Tutees more efficiently with each other and create better tutor pairs based off of their needs.

## Architecture

### Code organization:

- Data management (users, tutor/tutee posts) handled in the [API](https://github.com/rcaverob/tutorbase-backend)
- Components are broken down using the ReactJS component frameworks
- A global Redux state is used to more easily manage variables needed by a handful of components
  - Actions managed in [/actions](./actions), reducers handled in [/reducers](./reducers)
- Different components are accessible via routing

### Technologies used:
- React.js
- Redux
- Material UI 

## Setup

- Clone this repository using `git clone [REPO URL]`
- in the root folder of the directory: `yarn install` to install project dependencies

## Deployment

### On a Local Host

- _OPTIONAL:_ If you would like to run a local API with the local frontend - follow the instructions to [deploy the API locally](https://github.com/dartmouth-cs52-20S/project-api-tutorbase#deployment)
  - Update the `ROOT_URL` in the [actions index](./src/actions/index.js) to the localhost URL (likely [localhost:9090/api](https://localhost:9090/api`))
- `yarn start` to compile and deploy to [localhost:8080](https://localhost:8080)

## Authors

- Rodrigo Cavero Blades
- Mike Zhou
- Nicholas Bergen
- Brittany Critchfield
- Joseph Notis
- Kimberley Rangel
