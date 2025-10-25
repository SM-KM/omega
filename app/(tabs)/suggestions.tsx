import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Pressable, TouchableHighlight, TouchableNativeFeedback, Alert, TouchableWithoutFeedback, Animated, Modal, Dimensions, TextInput } from 'react-native';

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
        avatar: "#ef4444",
        auth: true
      },
      {
        author: "Jane Smith",
        content: "Second tweet in the thread with more details about the topic. I can write as much as I want here and it will all be displayed without cutting off any of the content. This makes it easy to read long-form content.",
        avatar: "#ef4444",
        auth: false
      },
      {
        author: "Jane Smith",
        content: "Third tweet continuing the discussion. Here's even more information that you might find interesting. The beauty of this approach is that everything is fully visible and readable without any ellipsis or truncation.",
        avatar: "#ef4444",
        auth: false
      },
      {
        author: "Jane Smith",
        content: "Final tweet wrapping up the thread! Thanks for reading through all of this content.",
        avatar: "#ef4444",
        auth: true
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
        avatar: "#f59e0b",
        auth: true
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
// @ts-ignore

const ThreadPost = ({ isLast, step, author, content, avatar, auth, onAuthorize }) => (
  <View style={styles.postContainer}>
    <View style={styles.leftColumn}>
      <View style={[styles.avatar, { backgroundColor: avatar }]}>
        <Text style={styles.avatarText}>{step}</Text>
      </View>
      {!isLast && <View style={styles.threadLine} />}
    </View>

    <View style={styles.contentColumn}>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.content}>{content}</Text>

      {auth && (
        <TouchableOpacity style={styles.buttonContainer} onPress={onAuthorize}>
          <Text style={styles.buttonText}>Authorize</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);


// Main feed view
// @ts-ignore
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
//@ts-ignore
const ThreadView = ({ thread, onBack }) => {
  const [visibleSteps, setVisibleSteps] = useState(1); // steps visible
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [currentAuthIndex, setCurrentAuthIndex] = useState<number | null>(null);

  const handleAuthorize = (stepIndex: number) => {
    setOtpVisible(true);
    setCurrentAuthIndex(stepIndex);
  };

  const handleOtpSubmit = () => {
    // Simulate successful OTP authorization
    setOtpVisible(false);
    setWaitingForAuth(false);
    if (currentAuthIndex !== null) {
      advanceStep(currentAuthIndex);
      setCurrentAuthIndex(null);
    }

    setOtp("");
  };
  const [otp, setOtp] = useState('');

  const advanceStep = (currentIndex: number) => {
    let newVisible = currentIndex + 1;
    // Auto-advance until hitting a step that requires auth
    while (newVisible < thread.length && !thread[newVisible]?.auth) {
      newVisible++;
    }
    setVisibleSteps(newVisible + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Thread</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {thread.slice(0, visibleSteps).map((post, index) => (
          <ThreadPost
            key={index}
            step={index + 1}
            isLast={index === thread.length - 1}
            author={post.author}
            content={post.content}
            avatar={post.avatar}
            auth={post.auth}
            onAuthorize={() => handleAuthorize(index)}
          />
        ))}
      </ScrollView>

      <Modal transparent visible={otpVisible} animationType="none">
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
              OTP to authorize
            </Text>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 16,
                textAlign: 'center',
                letterSpacing: 8,
              }}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              autoFocus
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOtpSubmit}
              disabled={otp.length !== 6}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeButton, { marginTop: 10 }]}
              onPress={() => {
                setOtpVisible(false);
                setOtp('');
              }}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>    </View>
  );
};


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

  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },

  nextButton: {
    marginTop: 0,
    padding: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    minHeight: 400,
  },
  closeButton: {
    backgroundColor: '#e4e4e4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
