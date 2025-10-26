import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * Hook sencillo para calcular FPS en tiempo real
 */
function useFps() {
  const [fps, setFps] = useState<number>(0);
  const frames = useRef(0);
  const last = useRef<number>(Date.now());

  useEffect(() => {
    let raf: number;
    const loop = () => {
      frames.current += 1;
      const now = Date.now();
      if (now - last.current >= 1000) {
        setFps(frames.current);
        frames.current = 0;
        last.current = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return fps;
}

type DebugOverlayProps = {
  initialVisible?: boolean;
  gitBranch?: string;
  gitSha?: string;
  env?: 'dev' | 'staging' | 'prod' | string;
};

/**
 * Overlay flotante de información del entorno
 */
export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  initialVisible = false,
  gitBranch,
  gitSha,
  env = 'dev',
}) => {
  const [visible, setVisible] = useState(initialVisible);
  const [pos, setPos] = useState({ x: 10, y: 60 });
  const fps = useFps();

  // Permitir arrastrar el overlay
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        setPos({
          x: Math.max(5, gesture.moveX - 80),
          y: Math.max(40, gesture.moveY - 20),
        });
      },
    })
  ).current;

  // Triple tap para mostrar / ocultar
  const tapCount = useRef(0);
  let tapTimeout: NodeJS.Timeout | null = null;

  const onTripleTap = () => {
    tapCount.current += 1;
    if (tapTimeout) clearTimeout(tapTimeout);
    tapTimeout = setTimeout(() => (tapCount.current = 0), 300);
    if (tapCount.current >= 3) {
      setVisible((v) => !v);
      tapCount.current = 0;
    }
  };

  useEffect(() => {
    const sub = AppState.addEventListener('change', () => (tapCount.current = 0));
    return () => sub.remove();
  }, []);

  if (!visible) {
    // invisible pero escucha triple tap
    return <Pressable onPress={onTripleTap} style={StyleSheet.absoluteFill} pointerEvents="box-none" />;
  }

  const info = Constants.expoConfig || Constants.manifest2 || (Constants as any).manifest;

  return (
    <View style={[styles.container, { top: pos.y, left: pos.x }]} {...panResponder.panHandlers}>
      <Text style={styles.badge}>{env?.toUpperCase()}</Text>
      <Text style={styles.title}>
        {info?.name ?? 'App'} · {info?.version ?? ''}
      </Text>
      <Text style={styles.line}>Branch: {gitBranch ?? 'unknown'}</Text>
      <Text style={styles.line}>Commit: {gitSha?.slice(0, 7) ?? 'unknown'}</Text>
      <Text style={styles.line}>FPS: {fps}</Text>
      <Text style={styles.line}>SDK: {info?.sdkVersion ?? '—'}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => (globalThis as any)?.Expo?.Updates?.reload?.()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Reload</Text>
        </Pressable>
        <Pressable onPress={() => setVisible(false)} style={[styles.btn, styles.secondary]}>
          <Text style={styles.btnText}>Hide</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 10,
    borderRadius: 12,
    width: 220,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
    fontWeight: '700',
  },
  title: { color: 'white', fontWeight: '700', marginBottom: 6 },
  line: { color: '#ddd', fontSize: 12, marginBottom: 2 },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  btn: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  secondary: { backgroundColor: '#6b7280' },
  btnText: { color: 'white', fontWeight: '600' },
});
