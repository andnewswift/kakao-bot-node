/// <reference types="node" />
import { Long } from ".";
import { NetworkManager } from "./network/network-manager";
import { ClientChatUser, ChatUser } from "./talk/user/chat-user";
import { EventEmitter } from "events";
import { ChatChannel } from "./talk/channel/chat-channel";
import { Chat } from "./talk/chat/chat";
import { UserManager } from "./talk/user/user-manager";
import { ChannelManager } from "./talk/channel/channel-manager";
import { ChatManager } from "./talk/chat/chat-manager";
import { OpenChatManager } from "./talk/open/open-chat-manager";
import { ChatFeed } from "./talk/chat/chat-feed";
import { LocoKickoutType } from "./packet/packet-kickout";
export declare class TalkClient extends EventEmitter {
    private name;
    private networkManager;
    private clientUser;
    private channelManager;
    private userManager;
    private chatManager;
    private openChatManager;
    constructor(name: string);
    get Name(): string;
    get NetworkManager(): NetworkManager;
    get ChannelManager(): ChannelManager;
    get UserManager(): UserManager;
    get ChatManager(): ChatManager;
    get OpenChatManager(): OpenChatManager;
    get ClientUser(): ClientChatUser;
    get LocoLogon(): boolean;
    login(email: string, password: string, deviceUUID: string, forced?: boolean): Promise<void>;
    logout(): Promise<void>;
    on(event: 'login', listener: (user: ClientChatUser) => void): this;
    on(event: 'disconnected', listener: (reason: LocoKickoutType) => void): this;
    on(event: 'message', listener: (chat: Chat) => void): this;
    on(event: 'message_read', listener: (channel: ChatChannel, reader: ChatUser, watermark: Long) => void): this;
    on(event: 'message_deleted', listener: (logId: Long, hidden: boolean) => void): this;
    on(event: 'user_join', listener: (channel: ChatChannel, user: ChatUser, feed: ChatFeed) => void): this;
    on(event: 'user_left', listener: (channel: ChatChannel, user: ChatUser, feed: ChatFeed) => void): this;
    on(event: 'join_channel', listener: (joinChannel: ChatChannel) => void): this;
    on(event: 'left_channel', listener: (leftChannel: ChatChannel) => void): this;
    once(event: 'login', listener: (user: ClientChatUser) => void): this;
    once(event: 'disconnected', listener: (reason: LocoKickoutType) => void): this;
    once(event: 'message', listener: (chat: Chat) => void): this;
    once(event: 'message_read', listener: (channel: ChatChannel, reader: ChatUser, watermark: Long) => void): this;
    once(event: 'message_deleted', listener: (logId: Long, hidden: boolean) => void): this;
    once(event: 'user_join', listener: (channel: ChatChannel, user: ChatUser, feed: ChatFeed) => void): this;
    once(event: 'user_left', listener: (channel: ChatChannel, user: ChatUser, feed: ChatFeed) => void): this;
    once(event: 'join_channel', listener: (joinChannel: ChatChannel) => void): this;
    once(event: 'left_channel', listener: (leftChannel: ChatChannel) => void): this;
}
