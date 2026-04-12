import { StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/common/primary-button';
import { TextField } from '@/components/common/text-field';
import { ThemedText } from '@/components/themed-text';

interface ProfileFormProps {
  fullName: string;
  phoneNumber: string;
  yearsOfExperience: string;
  education: string;
  onChangeFullName: (value: string) => void;
  onChangePhoneNumber: (value: string) => void;
  onChangeYearsOfExperience: (value: string) => void;
  onChangeEducation: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function ProfileForm({
  fullName,
  phoneNumber,
  yearsOfExperience,
  education,
  onChangeFullName,
  onChangePhoneNumber,
  onChangeYearsOfExperience,
  onChangeEducation,
  onSubmit,
  disabled = false,
  error,
}: ProfileFormProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Complete your profile</ThemedText>
      <TextField label="Full Name" onChangeText={onChangeFullName} placeholder="Your full name" value={fullName} />
      <TextField
        keyboardType="phone-pad"
        label="Phone Number"
        onChangeText={onChangePhoneNumber}
        placeholder="Phone number"
        value={phoneNumber}
      />
      <TextField
        keyboardType="numeric"
        label="Years of Experience"
        onChangeText={onChangeYearsOfExperience}
        placeholder="e.g. 3"
        value={yearsOfExperience}
      />
      <TextField label="Education" onChangeText={onChangeEducation} placeholder="Highest education" value={education} />
      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
      <PrimaryButton disabled={disabled} label="Save Profile" onPress={onSubmit} />
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