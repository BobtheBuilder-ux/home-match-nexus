
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, getDocs, query, where, orderBy, updateDoc, or } from 'firebase/firestore';

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

const CONVERSATIONS_COLLECTION = 'conversations';
const MESSAGES_COLLECTION = 'messages';

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
    
    const docRef = await addDoc(collection(db, CONVERSATIONS_COLLECTION), conversationData);
    return docRef.id;
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
    
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), messageData);
    
    // Update conversation with last message
    const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
    await updateDoc(conversationRef, {
      lastMessage: content,
      lastMessageTime: new Date().toISOString()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversations = async (userId: string) => {
  try {
    const q = query(
      collection(db, CONVERSATIONS_COLLECTION),
      or(where('agentId', '==', userId), where('tenantId', '==', userId)),
      orderBy('lastMessageTime', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const conversations: Conversation[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Conversation));
    
    return conversations;
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw error;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const q = query(
      collection(db, MESSAGES_COLLECTION),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: Message[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (conversationId: string, userId: string) => {
  try {
    const q = query(
      collection(db, MESSAGES_COLLECTION),
      where('conversationId', '==', conversationId),
      where('read', '==', false)
    );
    
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs
      .filter(doc => doc.data().senderId !== userId)
      .map(doc => updateDoc(doc.ref, { read: true }));
    
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};
