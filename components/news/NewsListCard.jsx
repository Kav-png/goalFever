import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import NewsFooter from "./NewsFooter";
import { checkImageURL } from "../../utils";

const NewsListCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: data.Image,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{data.Title}</Text>
        </View>
        <View style={styles.publisherWrapper}>
          <View style={styles.publisherTitleWrapper}>
            <View style={styles.publisherLogoWrapper}>
              <Image
                source={{
                  uri: data.PublisherLogo,
                }}
                style={styles.publisherLogo}
              />
            </View>
            <Text style={styles.publisherName}>{data.PublisherName}</Text>
          </View>
          <Text style={styles.date}>{data.PublisherDate}</Text>
        </View>
        <NewsFooter url={data.NewsLink} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: "column",
    marginBottom: 10,
    width: "100%",
    padding: 14,
    borderRadius: 16,
    ...{
      shadowColor: "#FFF",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    backgroundColor: "#FFF",
  },
  container: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontFamily: "DMBold",
    color: "#312651",
  },
  publisherLogoWrapper: {
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  publisherLogo: {
    width: "70%",
    height: "70%",
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  publisherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  publisherName: {
    fontFamily: "DMRegular",
    paddingLeft: 10,
  },
  overview: {
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  publisherTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default NewsListCard;
