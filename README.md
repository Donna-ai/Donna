# Donna

[![Join the chat at https://gitter.im/Donna-ai/Donna](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Donna-ai/Donna?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/Donna-ai/Donna.svg?branch=master)](https://travis-ci.org/Donna-ai/Donna)

> Donna, the best Virtual Secretary platform

---

## About

Donna is a platform for developing an artificial intelligent, virtual secretary.
You can create your own instance of Donna and extend her with a wide variety of plugins. Plugins range from Senses to Cortices to Controls.

- `Senses` are responsible for receiving stimulus as inputs into Donna.
    - Audio from microphones, Visuals from cameras, textual messages from SMS (texting), and more.
- `Cortices` are modular pieces of her brain that allow Donna to process `Thoughts`.
    - Text to Intent (Wit.ai), Speech Recognition, Facial Recognition, and more.
- `Controls` are ways Donna can interact and output information or responses to the world.
    - Show content on Chromecast on the TV, send SMS (text) messages, move robot limbs, and more.

For more technical information see [the documentation](docs/).

### Features

- Extensible with plugins for Senses, Cortices, and Controls.
- Distributed over many devices: Mac, Linux, Windows, iOS, Android, Raspberry Pi.

### Documentation

See [`docs/` directory](docs/) for list of documentation pages.
A good place to start is [archtecture.md](docs/anatomy/architecture.md).

### Goals and Roadmap

Unfiltered description by [Glavin Wiechert](https://github.com/Glavin001):
> My initial goal was to create a solid foundation for connecting modular plugins that handle either inputs (Sense plugins), outputs (Control plugins), or processes data ("Cortex" plugins). These plugins would then be switched together like high-level neural pathways passing relevant information to their neighbouring respecting plugins. While the human brain works on synapses connecting neurons, Donna would attempt to accomplish similar goals but at a higher level. Donna does not have a volume of brain that grew/learned organically to specialize in speech recognition: she has a module specifically designed for said purpose. Oversimplification: Think of her as LEGO blocks for brain functions. Data would flow through Donna and be interpreted with the context and could optionally output to controls (text to speech and many other mediums). After seeing Node-RED I now want to utilize Node-RED for that initial foundation and leverage its Web UI for connecting flows and use its existing packages. I then want to build Node-RED packages that are also used by Donna, for the purpose of: natural language processing (exists: use Witai), object recognition (computer vision), optical character recognition, speech to text (exists: Witai, AT&T, Google, PocketSphinx, Sphinx4, etc etc). I have tried a lot of current open source virtual assistants, and none have really impressed me enough to stick with them. I've seen many become abandoned and others be rewritten many times. I want IoT to be the foundation for the next virtual assistant: Donna. Input can come from limitless sources and data is passed thru Node-RED modules. Donna could express information in a wide variety of ways: auditory with text to speech, visually maybe on a chrome cast or custom web app, or push to your hand held phone's companion app because you're on the go. This is of course a very stretchy goal, but my main desire is to design a system for developing a virtual assistant that is extensible and connected, unlike many others. And then see what developers want to teach her. 
>
> I want to learn more and create an open source solution that I can grow upon and utilizes the power of IoT and the many existing technologies/APIs available today.

### [Donna Paulsen](http://www.imdb.com/character/ch0254800/) Talks About Donna.ai

![multitask](http://media.tumblr.com/tumblr_m5nqzwKwNe1r4l7pjo2_500.gif)

[Wit.ai](wit.ai) handles the Natural Language Processing and Donna takes care of interpretting the users' intent and interacting with the world.

![awesome brain](http://38.media.tumblr.com/06631ca9f96a3ff7e32d82d00f5eec33/tumblr_nkjwzjb93j1sryheco1_500.gif)

Get excited!

![secretary of the century](http://pbs.twimg.com/media/BASFEtUCIAMDZFt.jpg:large)
