import Vue from 'vue'
import {sortDate} from '../helper/sort'

describe('sort helper', () => {

  it('sort unsorted dates', () => {
    const testDate1 = new Date()
    const testDate2 = new Date() - 1000
    const tasks = [{date: testDate1}, {date: testDate2}];
    tasks.sort(sortDate);
    expect(tasks).toStrictEqual([{date: testDate2}, {date: testDate1}]);
  })

  it('sort sorted dates', () => {
    const testDate1 = new Date() - 1000
    const testDate2 = new Date()
    const tasks = [{date: testDate1}, {date: testDate2}];
    tasks.sort(sortDate);
    expect(tasks).toStrictEqual([{date: testDate1}, {date: testDate2}]);
  })
})
