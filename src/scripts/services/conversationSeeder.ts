
import { databases, DATABASE_ID, CONVERSATIONS_COLLECTION_ID, MESSAGES_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { SAMPLE_TENANT_IDS, SAMPLE_MESSAGES } from '../constants/sampleData';

export const seedConversations = async (properties: any[]) => {
  console.log('Creating conversations...');
  const conversations = properties.slice(0, 8).map((property, index) => ({
    propertyId: property.$id,
    agentId: property.agentId,
    tenantId: SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length],
    propertyTitle: property.title,
    lastMessage: SAMPLE_MESSAGES.CONVERSATION_STARTERS[index % 8],
    lastMessageTime: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: Math.floor(Math.random() * 3)
  }));

  const createdConversations = [];
  for (const conversation of conversations) {
    const response = await databases.createDocument(
      DATABASE_ID,
      CONVERSATIONS_COLLECTION_ID,
      ID.unique(),
      conversation
    );
    createdConversations.push(response);
    console.log(`Created conversation for: ${conversation.propertyTitle}`);
  }
  
  return createdConversations;
};

export const seedMessages = async (conversations: any[]) => {
  console.log('Creating messages...');
  const messages = [];
  conversations.forEach((conversation, index) => {
    // Add 2-4 messages per conversation
    const messageCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < messageCount; i++) {
      messages.push({
        conversationId: conversation.$id,
        senderId: i % 2 === 0 ? SAMPLE_TENANT_IDS[index % SAMPLE_TENANT_IDS.length] : conversation.agentId,
        senderName: i % 2 === 0 ? `Tenant ${index + 1}` : `Agent ${index + 1}`,
        content: i % 2 === 0 ? 
          SAMPLE_MESSAGES.TENANT_MESSAGES[Math.floor(Math.random() * 4)] :
          SAMPLE_MESSAGES.AGENT_RESPONSES[Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - (messageCount - i) * 2 * 60 * 60 * 1000).toISOString(),
        read: Math.random() > 0.3
      });
    }
  });

  const createdMessages = [];
  for (const message of messages) {
    const response = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      message
    );
    createdMessages.push(response);
  }
  console.log(`Created ${messages.length} messages`);
  
  return createdMessages;
};
