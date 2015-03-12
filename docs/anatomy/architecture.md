# Donna Architecture

Donna is a distributed, artificial intelligent, virtual assistant, modelled after how the human brain works. Comprised of plugins and capable of learning to interact with the world in many mediums, such as with audio or visuals or even physical interactions such as via a robot.

## Plugins
There are 3 types of plugins: sense, output, cortex.


### Sense Plugins

Sense plugins are analogous to the human senses.
See http://web.cs.wpi.edu/~gogo/courses/cs525H/slides/cs525H_04_OutputDev_Visual.pdf

Senses take in data from the outside world and send it to the Cortex (processing system). Sense plugins help normalize the data before the cortex processes it. Sense plugins are usually paired with Cortex plugins that know how to process that data format.

#### Data Flow
Auditory Sense plugin → Auditory Cortex plugin → Auditory Output plugin

- Auditory Sense plugin could be microphone attached to a computer that Donna can listen through and record audio input.
- Auditory Cortex plugin could be a speech recognition engine that handles input of audio recording and outputs text. See Cortex section below for more details.
- Auditory Output plugin could be speakers attached to a computer that Donna has access to. See Output plugins section below for more details.

Sense plugins will have a `.toIntent(context)` method that will automatically include the required Cortex plugin and process the raw data into the Intent Context object format. For example, when calling `toIntent` on the Auditory Sense plugin could utilize the respective (Auditory) Cortex plugin for Speech Recognition and send to the Intent preprocessor (Wit.ai). See Cortex section below for more details on the Intent entity format.

#### Input Entity

- sense type (required) {array of strings}
    - Values:
        - auditory, visual, etc
    - Video for instance would be both auditory and visual and the format of the data would be how the Cortex plugin would be chosen
- data type {array of strings}
    - Domain specific
        - Cortex plugins are expected to know what it can handle, given the
    - Possible values
        - “.wav”, “.mp3”, “Netflix”, “YouTube”, “.jpg”, “.png”,
- data {object}
  - Fields:
    - resource -


#### Types of Senses
- auditory
    - speech recognition
    - song recognition

- visual
    - pictures
    - videos (animated pictures, audio is processed by auditory input)
    - text chat interfaces
        - SMS, and other chatting interfaces are considered optical (visual)

- haptic
    - sense of touch
- olfactory
    - smell
- gustatory
    - taste


### Output

An output entity is serialized into an object that can be passed to the output plugins and the cortex decides which, if any or if multiple, Outputs are used.

Output plugins can handle conversion of Output entities into their implementation/hardware-specific format. For example, the Output object can be in textual f


#### Output Entity Object

```javascript
{
    “intent”: intentEntity, // reference to IntentEntity
    “sources”: [“youtube”], // “youtube” → plugin name that generated the OutputEntity
    “dataTypes”: [“YouTubeVideo”, “.mp4”] // list of supported data types for this output
    “data”: { // data for each of the data types in their respective formats
        “YouTubeVideo”: {
        	“url”: “https://www.youtube.com/watch?v=iEPTlhBmwRg”
        },
    	“.mp4”: {
        	“url”: “http://DONNA-SERVER/FILE-NAME.mp4”
        }, // … etc
    }
}
```

##### Types of Outputs:
- auditory
    - text-to-speech
    - play songs
- optical
    - play YouTube video
    - show picture
- … more coming later

### Cortex
- thought processing components
- takes input and results in expected output
    - knows how to flow from input to process data and then output appropriately
- natural language processing
    - inputs are processed and sent into the cortex processing system as serialized intents
        - Speech → Auditory input → Wit.ai → intent
        - SMS → Visual input → Wit.ai → intent


## Memory
Donna’s memory is split into long-term and short-term.
Long-term is stored on a persistent database. Short-term is stored in memory, and will be much faster.
Memory can be “primed”, meaning long-term memory can be manually loaded into short-term memory for efficient access and processing.

## Behavior Driven Development: Things Donna should do

### From Voice (auditory input):
- Play YouTube video on visual output devices
    - audio → Wit.ai speech to intent →
- “What movie should I watch tonight?”
    - audio → Wit.ai speech to intent → intent “movie_recommendation” → extract from context { timeframe: “tonight”, genre: null,  viewers: [“Glavin”], ... } → Use IMDB, movie watch history, Netflix, recently released, other recommendation algorithms →

- “What should I have for dinner tonight?”
- Step through recipes (remember where in the recipe you are)

- “Turn on lights in bedroom”
    - → intent “toggle_lights”
    - → extract from context {room: “bedroom”, state: “on” }
    - → send request to Donna server that has access to the Bedroom lights
    - → turn on bedroom lights
- Search for movies / TV shows
- Download movies / TV shows
- "When Celina is over remind me to to tell her I love her ;)"

### From Pictures (optical input):
- Facial recognition
    - who is this?
    - see people in camera feeds

- Distributed Nodes of Donna Servers and Clients
    - Servers
        - Node.js
    - Clients
        - Browser, iOS, Android, Raspberry Pi, etc

TODO Plugins
- SMS - Sense and Output plugin
    - Twilio integration
    - receive SMS → text → intent
    - output → send SMS
- Voice - Sense and Cortex plugin
    - Wit.ai speech recognition
    - Wit.ai text to intent
- IMDB - Cortex plugin
    - Search for movies / tv shows / actors information, etc
    - http://developer.rottentomatoes.com/
    -  http://www.suggestmemovie.com/
- Recipes (BigOven) - Cortex plugin
    - See http://api.bigoven.com/documentation/recipes
- WebGUI - Sense and Output plugin
    - Output plugin generates a web server and web application for GUI
    - Web GUI interactions are received by Donna with Sense plugin and API
