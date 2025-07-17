import { StyleSheet } from 'react-native';

export const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    paddingVertical: 16,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  weekdayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayItemText: {
    color: 'gray',
  },
  dateList: {
    flex: 1,
  },
});
