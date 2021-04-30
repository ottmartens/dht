# dht

Distributed hash table

### Implementation details

The nodes are started as separate nodeJs processes. The nodes communicate via rest endpoint calls.

There are two distinct types of endpoints - internal and external. The external enpoints are called by the cli process to orchestrate passing the commands to nodes. The internal enpoints are used by the nodes to coordinate the actions among themselves.

The "master process" is only used to orchestrate spinning up new nodes and passing the commands entered into the cli to the nodes via rest endpoint calls. All other actions are carried out by the nodes autonomously to mimic a real distributed system as closely as possible.

#### Communication
Each node exposes it's endpoints at localhost port `3000 + node's id`. This mapping allows each node to discover other nodes - a node just needs to know the id of the node it wishes to communicate with.

### Prerequisites

- NodeJS >= 12.0

run `npm install`

### Start

`npm start input.txt`

Wait for the bootstrapping process to finish. After that, commands can be executed.
