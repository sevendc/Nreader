/**
 * Antti Suuronen 2017
 * Reads rss feed from uutimet.net tietoviikko and displays titles.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { setNews } from './reducers/actions'
import { parseRRS, removeCDATA } from './utils/parser'

class ListView extends Component {
  async componentWillMount() {
    const { dispatch } = this.props
    try {
      // TODO feed RSS feed from parent
      dispatch(
        setNews(await fetch('http://uutimet.net/rss/?show=itviikko').then(res => res.text()))
      )
    } catch (e) {
      dispatch(setNews('error ' + e))
    }

  }

  render() {
    const { news } = this.props
    return (
      <ScrollView>
        <View style={styles.news}>
        {
          (news !== null) ?
            parseRRS(news).map((n, i) => (
              <View style={styles.row} key={"news-" + i}>
                <Text>{ removeCDATA(n.childNodes[0].nodeValue) }</Text>
              </View>
            ))
          : null
        }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
       flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  news: {
    margin: 6
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  }
});

export default connect(state => ({
    news: state.news.news
  })
)(ListView);
