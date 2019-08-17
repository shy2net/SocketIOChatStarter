export class ChatUI {
  constructor() {}
  username: string;

  init() {
    document.querySelector('#submit_text').addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.submitTextMessage();
      }
    });

    document.querySelector('#submit_btn').addEventListener('click', event => this.submitTextMessage());
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

  joinAsUser(username: string) {
    this.username = username;
    this.addChatMessage('System', `Welcome ${this.username}`);
  }

  addChatMessage(from: string, message: string) {
    const chatMsg = document.createElement('div');
    chatMsg.className = 'chat-message';
    chatMsg.innerHTML = `<span class="username">${from}: </span><span class="message">${message}</span>`;
    document.querySelector('.chat-messages').appendChild(chatMsg);
  }
}

export default new ChatUI();
