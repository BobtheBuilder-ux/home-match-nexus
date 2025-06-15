
import { messaging, databases, DATABASE_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const MESSAGES_COLLECTION_ID = 'messages';
const CONVERSATIONS_COLLECTION_ID = 'conversations';

export interface Message {
  id?: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id?: string;
  propertyId: string;
  agentId: string;
  tenantId: string;
  propertyTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const createConversation = async (
  propertyId: string,
  agentId: string,
  tenantId: string,
  propertyTitle: string
) => {
  try {
    const conversationData: Omit<Conversation, 'id'> = {
      propertyId,
      agentId,
      tenantId,
      propertyTitle,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0
    };
    
    const response = await databases.createDocument(
      DATABASE_ID,
      CONVERSATIONS_COLLECTION_ID,
      ID.unique(),
      conversationData
    );
    return response.$id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

export const sendMessage = async (
  conversationId: string,
  senderId: string,
  senderName: string,
  content: string
) => {
  try {
    const messageData: Omit<Message, 'id'> = {
      conversationId,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const response = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      messageData
    );
    
    // Update conversation with last message
    await databases.updateDocument(
      DATABASE_ID,
      CONVERSATIONS_COLLECTION_ID,
      conversationId,
      {
        lastMessage: content,
        lastMessageTime: new Date().toISOString()
      }
    );
    
    return response.$id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversations = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      CONVERSATIONS_COLLECTION_ID,
      [
        Query.or([
          Query.equal('agentId', userId),
          Query.equal('tenantId', userId)
        ]),
        Query.orderDesc('lastMessageTime')
      ]
    );
    
    const conversations: Conversation[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as Conversation;
    });
    
    return conversations;
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw error;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal('conversationId', conversationId),
        Query.orderAsc('timestamp')
      ]
    );
    
    const messages: Message[] = response.documents.map(doc => {
      const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = doc;
      return {
        id: $id,
        ...data
      } as Message;
    });
    
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (conversationId: string, userId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      [
        Query.equal('conversationId', conversationId),
        Query.notEqual('senderId', userId),
        Query.equal('read', false)
      ]
    );
    
    const updatePromises = response.documents.map(doc =>
      databases.updateDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        doc.$id,
        { read: true }
      )
    );
    
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};
