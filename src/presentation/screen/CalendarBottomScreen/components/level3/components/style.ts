import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const calendarBodyStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthlyContainer: {
    width: width,
    flex: 1,
    gap: 10,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    height: 40,
    paddingHorizontal: 16,
  },
  dayItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  today: {},
  selected: {
    backgroundColor: 'aqua',
    borderRadius: 50,
  },
});

export default calendarBodyStyle;
