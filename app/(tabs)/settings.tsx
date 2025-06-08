import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import i18next from "i18next";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import CheckIcon from "../icons/Check";

function Tab() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); // ✅ bu yerga to‘g‘rilandi

  const language = [
    {
      title: "Ozbekcha",
      code: "uz",
      image: require("../../assets/uz.png"),
    },
    {
      title: "English",
      code: "en",
      image: require("../../assets/en.png"),
    },
    {
      title: "Ruscha",
      code: "ru",
      image: require("../../assets/ru.png"),
    },
  ];

  const changeLan = (lan: string) => {
    i18next.changeLanguage(lan);
    AsyncStorage.setItem("language", lan);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Settings"),
    });
  }, [t, i18n.language]);

  return (
    <View style={styles.container}>
      {/* <Header key={i18n.language} title={t("Settings")} /> */}

      {language.map((item) => {
        return (
          <TouchableOpacity
            key={item.code}
            onPress={() => changeLan(item.code)}
            style={[
              styles.itemA,
              i18next.language === item.code && styles.active,
            
            ]}
          >
            <Image style={styles.imageA} source={item.image} />
            <Text style={styles.textA}>{item.title}</Text>
            {i18next.language === item.code && <CheckIcon />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  itemA: {
    marginHorizontal: 15,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEFF3",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 5,
    backgroundColor:"#fff",
  },
  active: {
    borderColor: "#1F8824",
  },
  imageA: {
    width: 35,
    height: 20,
    marginRight: 10,
  },
  textA: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Nunito-Mediem",
    color: "#000",
  },
});

export default Tab;
