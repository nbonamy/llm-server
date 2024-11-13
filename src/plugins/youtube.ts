
import { Plugin, PluginParameter } from 'multi-llm-ts';
import { YoutubeTranscript } from 'youtube-transcript'
import ytv from 'ytv';

export default class extends Plugin {

  isEnabled(): boolean {
    return true;
  }

  getName(): string {
    return 'get_youtube_transcript';
  }

  getDescription(): string {
    return 'Returns the transcript of a YouTube video';
  }

  getRunningDescription(): string {
    return 'Downloading transcript…';
  }

  getParameters(): PluginParameter[] {
    return [
      {
        name: 'url',
        type: 'string',
        description: 'The URL of the YouTube video to get the transcript of',
        required: true
      }
    ];
  }

  async execute(parameters: any): Promise<any> {

    try {
      const info = await ytv.get_info(parameters.url)
      const transcript = await YoutubeTranscript.fetchTranscript(parameters.url)
      return {
        title: info.title,
        channel: info.channel_name,
        content: transcript.map((line: any) => line.text).join(' ')
      }
    } catch (error) {
      console.error(error)
      return { error: error }
    }

  }  

}