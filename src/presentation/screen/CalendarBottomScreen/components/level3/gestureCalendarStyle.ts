import { Dimensions, StyleSheet } from 'react-native';

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

const { width } = Dimensions.get('window');

export const weeklyStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width,
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 16,
  },
});
