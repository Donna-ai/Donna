# Routers

## Input Router

> Sense plugin (in background, passive) --> Input entity --> Intent entity

Receives input entities from Senses and converts them to Intents.

## Intent Router

> Intent entity --> Brain Plugin(s) --> Output

Receives Intents and attempts to process them and return (optional) output(s).

## Output Router

> Output entity --> Output plugin(s)

Receives Output entities and routes them to their appropriate Output plugin / device.
