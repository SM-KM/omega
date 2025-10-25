import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const tweetsData = [
  {
    id: 1,
    author: "John Doe",
    content: "This is a standalone tweet without a thread.",
    avatar: "#3b82f6",
    hasThread: false
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "This tweet has a thread! Tap to view all tweets in this conversation. This is the beginning of a longer discussion about various topics that I want to share with everyone.",
    avatar: "#ef4444",
    hasThread: true,
    thread: [
      {
        author: "Jane Smith",
        content: "This tweet has a thread! Tap to view all tweets in this conversation. This is the beginning of a longer discussion about various topics that I want to share with everyone. The full text will be visible both in the feed and in the thread view.",
        avatar: "#ef4444"
      },
      {
        author: "Jane Smith",
        content: "Second tweet in the thread with more details about the topic. I can write as much as I want here and it will all be displayed without cutting off any of the content. This makes it easy to read long-form content.",
        avatar: "#ef4444"
      },
      {
        author: "Jane Smith",
        content: "Third tweet continuing the discussion. Here's even more information that you might find interesting. The beauty of this approach is that everything is fully visible and readable without any ellipsis or truncation.",
        avatar: "#ef4444"
      },
      {
        author: "Jane Smith",
        content: "Final tweet wrapping up the thread! Thanks for reading through all of this content.",
        avatar: "#ef4444"
      }
    ]
  },
  {
    id: 3,
    author: "Bob Johnson",
    content: "Another standalone tweet here. This one also has plenty of text that will be fully visible.",
    avatar: "#10b981",
    hasThread: false
  },
  {
    id: 4,
    author: "Alice Williams",
    content: "Starting a thread about React Native navigation and how to implement it effectively in your applications.",
    avatar: "#f59e0b",
    hasThread: true,
    thread: [
      {
        author: "Alice Williams",
        content: "Starting a thread about React Native navigation",
        avatar: "#f59e0b"
      },
      {
        author: "Alice Williams",
        content: "Navigation in React Native can be done with state management.",
        avatar: "#f59e0b"
      },
      {
        author: "Alice Williams",
        content: "It's simple and effective for basic use cases! You can manage view transitions, pass data between screens, and create a smooth user experience.",
        avatar: "#f59e0b"
      }
    ]
  }
];

// Single tweet in feed view
//@ts-ignore
const TweetCard = ({ tweet, onPress }) => (
  <TouchableOpacity
    style={styles.tweetCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.tweetContent}>
      <View style={[styles.avatar, { backgroundColor: tweet.avatar }]}>
        <Text style={styles.avatarText}>{tweet.author[0]}</Text>
      </View>

      <View style={styles.tweetTextContainer}>
        <Text style={styles.author}>{tweet.author}</Text>
        <Text style={styles.content}>{tweet.content}</Text>
        {tweet.hasThread && (
          <Text style={styles.threadIndicator}>Show this thread →</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Thread post with connecting lines
const ThreadPost = ({ isLast, author, content, avatar }) => (
  <View style={styles.postContainer}>
    <View style={styles.leftColumn}>
      <View style={[styles.avatar, { backgroundColor: avatar }]}>
        <Text style={styles.avatarText}>{author[0]}</Text>
      </View>
      {!isLast && <View style={styles.threadLine} />}
    </View>

    <View style={styles.contentColumn}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  </View>
);

// Main feed view
const FeedView = ({ tweets, onTweetPress }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Suggestions</Text>
    </View>
    <ScrollView>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onPress={() => onTweetPress(tweet)}
        />
      ))}
    </ScrollView>
  </View>
);

// Thread detail view
const ThreadView = ({ thread, onBack }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Thread</Text>
    </View>
    <ScrollView>
      {thread.map((post, index) => (
        <ThreadPost
          key={index}
          isLast={index === thread.length - 1}
          author={post.author}
          content={post.content}
          avatar={post.avatar}
        />
      ))}
    </ScrollView>
  </View>
);

// Main App component with navigation logic
export default function App() {
  const [currentView, setCurrentView] = useState('feed'); // 'feed' or 'thread'
  const [selectedThread, setSelectedThread] = useState(null);

  const handleTweetPress = (tweet) => {
    if (tweet.hasThread) {
      setSelectedThread(tweet.thread);
      setCurrentView('thread');
    }
  };

  const handleBack = () => {
    setCurrentView('feed');
    setSelectedThread(null);
  };

  return (
    <>
      {currentView === 'feed' ? (
        <FeedView tweets={tweetsData} onTweetPress={handleTweetPress} />
      ) : (
        <ThreadView thread={selectedThread} onBack={handleBack} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  // Feed styles
  tweetCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 16,
  },
  tweetContent: {
    flexDirection: 'row',
  },
  tweetTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  threadIndicator: {
    color: '#3b82f6',
    marginTop: 8,
    fontSize: 14,
  },
  // Thread styles
  postContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  threadLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#cbd5e1',
    marginTop: 4,
  },
  contentColumn: {
    flex: 1,
    paddingTop: 8,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1f2937',
  },
});
