import { View, Text, ActivityIndicator, Button } from "react-native";
import React, { useEffect } from "react";
import usePostFetch from "../../../hook/postFetch";

const SearchScreenTab = ({ searchSelected }) => {
  const { refetch, isLoading, error } = usePostFetch(searchSelected, {
    page: 1,
  });
  const handlePostData = async (postData) => {
    // Perform any necessary validation or preprocessing of the postData
    await refetch(postData);
  };

  return (
    <View>
      <Button
        title={isLoading ? "Posting..." : "Post Data"}
        onPress={() => handlePostData(formData)}
        disabled={isLoading}
      />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

export default SearchScreenTab;
// TODO: Using this to search for players etc
