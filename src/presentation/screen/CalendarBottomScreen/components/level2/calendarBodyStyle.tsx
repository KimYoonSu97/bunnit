import { StyleSheet } from 'react-native';

export const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    maxHeight: 50,
    padding: 5,
  },
  dayItem: {
    flex: 1,
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  isCurrentMonth: {
    color: 'black',
  },
  isOtherMonth: {
    color: 'gray',
    opacity: 0.4,
  },
  selectDay: {
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
  selectDayText: {
    fontWeight: '700',
  },
});
