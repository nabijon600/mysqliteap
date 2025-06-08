import { FontAwesome } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type UserType = { id: number; name: string; email: string };

export default function TabHome() {
  const [data, setData] = useState<UserType[]>([]);
  const database = useSQLiteContext();
  const loadData = async () => {
    const result = await database.getAllAsync<UserType>("SELECT * FROM users;");
    setData(result); // yoki agar kerak bo‘lsa: setData(result.rows)
  };
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("Home"),
      headerRight,
    });
  }, [t, i18n.language]);

  // useEffect(() => {
  //   loadData();
  // }, []); faqat birinchi marta ishlaydi

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  ); //xar safar ishlaydi

  const handleDeleteSql = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM users WHERE id = ?;", [id]);
      loadData(); // Ro'yxatni yangilash
    } catch (error) {
      console.error("Foydalanuvchini oʻchirishda xatolik yuz berdi:", error);
    }
  };
  const handleDelete = (id: number) => {
    Alert.alert(
      "O`chirishni tasdiqlang",
      "Haqiqatan ham bu foydalanuvchini o`chirib tashlamoqchimisiz?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteSql(id),
        },
      ]
    );
  };

  const headerRight = () => {
    //button bosilganda modal txs oynasiga o'tish
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/modal")}
          style={{ marginRight: 10, cursor: "pointer" }}
        >
          <FontAwesome name="plus-circle" size={28} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/modalTwo")}
          style={{ marginRight: 10 }}
        >
          <FontAwesome name="user" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/modalCaptcha")}
          style={{ marginRight: 10 }}
        >
          <FontAwesome name="book" size={28} color="red" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        key={i18n.language} // <-- bu orqali har til o‘zgarganda header yangilanadi
        options={{
          title: t("Home"),
          headerRight,
        }}
      />

      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.emailText}>{item.email}</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/modal?id=${item.id}`);
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>{t("Update")}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item.id);
                    }}
                    style={styles.buttonDel}
                  >
                    <Text style={styles.buttonText}>{t("Delete")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "column",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  buttonDel: {
    backgroundColor: "red",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
