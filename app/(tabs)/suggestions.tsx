import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* =======================
 * Types
 * ======================= */
type ThreadItem = {
  author: string;
  content: string;
  avatar: string;
  auth?: boolean;
};

type TweetItem = {
  id: number;
  author: string;
  content: string;
  avatar: string;
  hasThread?: boolean;
  thread?: ThreadItem[];
};

type TweetCardProps = {
  tweet: TweetItem;
  onPress: () => void;
};

type ThreadPostProps = {
  isLast: boolean;
  step: number;
  author: string;
  content: string;
  avatar: string;
  auth?: boolean;
  onAuthorize?: () => void;
};

type FeedViewProps = {
  tweets: TweetItem[];
  onTweetPress: (tweet: TweetItem) => void;
};

type ThreadViewProps = {
  thread: ThreadItem[];
  onBack: () => void;
};

/* =======================
 * Mock Data
 * ======================= */
const mockData: TweetItem[] = [
  {
    id: 1,
    author: 'Financial Strategy',
    content:
      'Starting a balance transfer plan to reduce interest payments across your credit cards.',
    avatar: '#3b82f6',
    hasThread: true,
    thread: [
      {
        author: 'Financial Strategy',
        content:
          "Transfer $15,000 from 'BBVA Gold' to 'HSBC Zero'. This lowers your interest cost because HSBC Zero has a lower APR. Estimated interest savings: $147.95.",
        avatar: '#3b82f6',
        auth: true,
      },
      {
        author: 'Financial Strategy',
        content:
          "Next, transfer $8,000 from 'Citi Premier' to 'BBVA Gold'. This consolidates debt to optimize payments and reduce fees. Estimated interest savings: $85.48.",
        avatar: '#3b82f6',
        auth: true,
      },
      {
        author: 'Financial Strategy',
        content:
          'By following these transfers, you set up a structure where your payments target the highest-interest debt first, maximizing your savings.',
        avatar: '#3b82f6',
        auth: true,
      },
    ],
  },
  {
    id: 2,
    author: 'Month 1 Plan',
    content:
      "Available funds this month: $7,000. Here's the optimal payment allocation to reduce interest:",
    avatar: '#f59e0b',
    hasThread: true,
    thread: [
      {
        author: 'Month 1 Plan',
        content:
          'Pay minimums first: HSBC Zero $400, BBVA Gold $400, Santander Light $360. Covering minimums prevents late fees and keeps your credit healthy.',
        avatar: '#f59e0b',
        auth: true,
      },
      {
        author: 'Month 1 Plan',
        content:
          'Allocate the remaining $5,840 to HSBC Zero, the card with the highest interest. This accelerates debt reduction and maximizes interest savings.',
        avatar: '#f59e0b',
        auth: true,
      },
      {
        author: 'Month 1 Plan',
        content:
          'Following this plan, you could save an extra ~$150 this month in interest compared to paying minimums only.',
        avatar: '#f59e0b',
        auth: true,
      },
    ],
  },
  {
    id: 3,
    author: 'Month 2 Plan',
    content:
      'Available funds this month: $7,000. Continue prioritizing payments to high-interest debt.',
    avatar: '#ef4444',
    hasThread: true,
    thread: [
      {
        author: 'Month 2 Plan',
        content:
          'Pay minimums: HSBC Zero $400, BBVA Gold $394, Santander Light $351. Covering minimums ensures no penalties and keeps your payment strategy on track.',
        avatar: '#ef4444',
        auth: true,
      },
      {
        author: 'Month 2 Plan',
        content:
          'Allocate the remaining $5,855 to HSBC Zero to further reduce high-interest debt quickly.',
        avatar: '#ef4444',
        auth: true,
      },
      {
        author: 'Month 2 Plan',
        content:
          'This method continues to save you around ~$150 in interest compared to a standard minimum payment approach.',
        avatar: '#ef4444',
        auth: true,
      },
    ],
  },
  {
    id: 4,
    author: 'Month 3 Plan',
    content:
      'Available funds this month: $7,000. Stick to the proven strategy to reduce interest payments.',
    avatar: '#f59e0b',
    hasThread: true,
    thread: [
      {
        author: 'Month 3 Plan',
        content: 'Pay minimums: HSBC Zero $400, BBVA Gold $388.09, Santander Light $342.23.',
        avatar: '#f59e0b',
        auth: true,
      },
      {
        author: 'Month 3 Plan',
        content:
          'Allocate the remaining $5,869.68 to HSBC Zero. This continues to reduce the balance on the highest-interest card first.',
        avatar: '#f59e0b',
        auth: true,
      },
      {
        author: 'Month 3 Plan',
        content:
          'By Month 3, following this flow could save you more than $4000 in total interest compared to paying only minimums, keeping more money in your pocket.',
        avatar: '#f59e0b',
        auth: true,
      },
    ],
  },
  {
    id: 5,
    author: 'Summary',
    content:
      'Final balances and interest paid after following this strategic payment plan:',
    avatar: '#3b82f6',
    hasThread: true,
    thread: [
      {
        author: 'Summary',
        content: 'BBVA Gold | Initial: $8,000 | Final: $7,645.37 | Interest Paid: $827.46',
        avatar: '#3b82f6',
        auth: true,
      },
      { author: 'Summary', content: 'Citi Premier | Initial: $0 | Final: $0 | Interest Paid: $0', avatar: '#3b82f6',auth: true, },
      {
        author: 'Summary',
        content: 'HSBC Zero | Initial: $27,000 | Final: $11,551.04 | Interest Paid: $2,863.52',
        avatar: '#3b82f6',
        auth: true,
      },
      {
        author: 'Summary',
        content: 'Santander Light | Initial: $9,000 | Final: $8,341.73 | Interest Paid: $394.96',
        avatar: '#3b82f6',
        auth: true,
      },
      {
        author: 'Summary',
        content:
          'Total Interest Paid: $4,085.94 — following this strategy could save you thousands compared to paying only minimums.',
        avatar: '#3b82f6',
        auth: true,
      },
    ],
  },
];

/* =======================
 * UI Components
 * ======================= */
const TweetCard: React.FC<TweetCardProps> = ({ tweet, onPress }) => (
  <TouchableOpacity style={styles.tweetCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.tweetContent}>
      <View style={[styles.avatar, { backgroundColor: tweet.avatar }]} />
      <View style={styles.tweetTextContainer}>
        <View>
          <Text style={styles.author}>{tweet.author}</Text>
        </View>
        <Text style={styles.content}>{tweet.content}</Text>
        {tweet.hasThread && <Text style={styles.threadIndicator}>Start plan →</Text>}
      </View>
    </View>
  </TouchableOpacity>
);

const ThreadPost: React.FC<ThreadPostProps> = ({
  isLast,
  step,
  author,
  content,
  avatar,
  auth,
  onAuthorize,
}) => (
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

const FeedView: React.FC<FeedViewProps> = ({ tweets, onTweetPress }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Suggestions</Text>
    </View>
    <ScrollView>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} onPress={() => onTweetPress(tweet)} />
      ))}
    </ScrollView>
  </View>
);

/* =======================
 * Thread View
 * ======================= */
const ThreadView: React.FC<ThreadViewProps> = ({ thread, onBack }) => {
  const [visibleSteps, setVisibleSteps] = useState<number>(1);
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [currentAuthIndex, setCurrentAuthIndex] = useState<number | null>(null);
  const [otp, setOtp] = useState<string>('');

  const handleAuthorize = (stepIndex: number) => {
    setOtpVisible(true);
    setCurrentAuthIndex(stepIndex);
  };

  const advanceStep = (currentIndex: number) => {
    let newVisible = currentIndex + 1;
    // Auto-advance until hitting a step that requires auth
    while (newVisible < thread.length && !thread[newVisible]?.auth) {
      newVisible++;
    }
    setVisibleSteps(Math.min(newVisible + 1, thread.length));
  };

  const handleOtpSubmit = () => {
    // Simulate successful OTP authorization
    setOtpVisible(false);
    if (currentAuthIndex !== null) {
      advanceStep(currentAuthIndex);
      setCurrentAuthIndex(null);
    }
    setOtp('');
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
            key={`${post.author}-${index}`}
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
              style={styles.otpInput}
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
      </Modal>
    </View>
  );
};

/* =======================
 * App
 * ======================= */
export default function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<'feed' | 'thread'>('feed');
  const [selectedThread, setSelectedThread] = useState<ThreadItem[] | null>(null);

  const handleTweetPress = (tweet: TweetItem) => {
    if (tweet.hasThread && tweet.thread) {
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
        <FeedView tweets={mockData} onTweetPress={handleTweetPress} />
      ) : (
        selectedThread && <ThreadView thread={selectedThread} onBack={handleBack} />
      )}
    </>
  );
}

/* =======================
 * Styles
 * ======================= */
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
    justifyContent: 'center',
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
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 8,
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
  save: {
    color: 'green',
  },
});
