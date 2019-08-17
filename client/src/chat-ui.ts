import { ChatMessenger } from './chat-messenger';

export class ChatUI {
  constructor(protected messenger: ChatMessenger, protected host: string) {}
  username: string;

  init() {
    document.querySelector('#submit_text').addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.submitTextMessage();
      }
    });

    document.querySelector('#submit_btn').addEventListener('click', event => this.submitTextMessage());
    this.addChatMessage('System', 'WELCOME! Please type in your username before we start');
  }

  submitTextMessage() {
    const submitTextEl = document.querySelector('#submit_text') as HTMLInputElement;
    const txtMsg = submitTextEl.value;

    if (txtMsg) {
      // If there isn't a username provided yet,
      if (!this.username) {
        this.joinAsUser(txtMsg);
        submitTextEl.value = '';
        return;
      }

      this.addChatMessage(this.username, txtMsg);
      submitTextEl.value = '';
    }
  }

  async joinAsUser(username: string) {
    this.username = username;
    this.addChatMessage('System', `Welcome ${this.username}! Now connecting...`);
    const socket = await this.messenger.connect(this.host, this.username);
    this.addChatMessage('System', `You are now connected to our chat system!`);
  }

  addChatMessage(from: string, message: string) {
    const chatMsg = document.createElement('div');
    chatMsg.className = 'chat-message';
    chatMsg.innerHTML = `<span class="username">${from}: </span><span class="message">${message}</span>`;
    document.querySelector('.chat-messages').appendChild(chatMsg);
  }
}
