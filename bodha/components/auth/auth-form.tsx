import { StyleSheet, View } from 'react-native';

import { BrandHeader } from '@/components/common/brand-header';
import { PrimaryButton } from '@/components/common/primary-button';
import { TextField } from '@/components/common/text-field';
import { ThemedText } from '@/components/themed-text';

interface AuthFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  email: string;
  password: string;
  confirmPassword?: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword?: (value: string) => void;
  onSubmit: () => void;
  error?: string | null;
  disabled?: boolean;
}

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  email,
  password,
  confirmPassword,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onSubmit,
  error,
  disabled = false,
}: AuthFormProps) {
  return (
    <View style={styles.container}>
      <BrandHeader subtitle={subtitle} title={title} />
      <TextField
        keyboardType="email-address"
        label="Email"
        onChangeText={onChangeEmail}
        placeholder="Enter your email"
        value={email}
      />
      <TextField
        label="Password"
        onChangeText={onChangePassword}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
      />
      {typeof confirmPassword === 'string' && onChangeConfirmPassword ? (
        <TextField
          label="Confirm Password"
          onChangeText={onChangeConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
        />
      ) : null}
      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
      <PrimaryButton disabled={disabled} label={submitLabel} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  error: {
    color: '#b42318',
  },
});