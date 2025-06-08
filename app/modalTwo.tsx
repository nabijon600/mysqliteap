import { Stack, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import "./i18n/index";

type Props = {
  title: string;
};
const colorScheme = useColorScheme(); // 'light' yoki 'dark'

export default function Modaltwo({ title }: Props) {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams(); // id ni olish uchun // expo-router
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pasSeria, setPasSeria] = useState("");
  const [pasNumber, setPasNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false);
  const database = useSQLiteContext();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const userId = parseInt(id as string);
    if (!userId) return;

    const result = await database.getFirstAsync<{
      name: string;
      email: string;
    }>("SELECT name, email FROM users WHERE id = ?;", [userId]);

    if (result) {
      setName(result.name);
      setEmail(result.email);
    }
  };

  const handleSave = async () => {
    if (!isValidEmail(email)) {
      alert(t("InvalidEmail"));
      return;
    }

    try {
      await database.runAsync(
        "INSERT INTO users (name, email) VALUES (?, ?);",
        [name, email]
      );
      alert(t("UserAdded"));
      router.back();
    } catch (error) {
      console.error("Error saving user:", error);
      alert(t("SomethingWentWrong"));
    }
  };
  const handleUpdate = async () => {
    if (!isValidEmail(email)) {
      alert("Iltimos, to'g'ri email manzil kiriting.");
      return;
    }

    try {
      const response = await database.runAsync(
        "UPDATE users SET name = ?, email = ? WHERE id = ?;",
        [name, email, parseInt(id as string)]
      );
      console.log("Element muvaffaqiyatli yangilandi", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Elementni yangilashda xatolik yuz berdi:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t("ItemModal") }} />
      <View
        style={{
          gap: 10,
          marginVertical: 10,
        }}
      >
        <TextInput
          placeholder={t("EnterName")}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder={t("Email")}
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder={t("PasSeria")}
            value={pasSeria}
            onChangeText={setPasSeria}
            style={[styles.textInput, { flex: 1, marginRight: 5 }]}
          />
          <TextInput
            placeholder={t("PasNumber")}
            value={pasNumber}
            onChangeText={setPasNumber}
            style={[styles.textInput, { flex: 1, marginLeft: 5 }]}
          />
        </View>

        <TextInput
          placeholder={t("Adress")}
          value={adress}
          onChangeText={setAdress}
          style={styles.textInput}
        />

        <TextInput
          placeholder={t("Phone")}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.textInput}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={styles.buttonText}>{t("Back")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            editMode ? handleUpdate() : handleSave();
          }}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.buttonText}>
            {editMode ? t("Update") : t("Save")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
    color: colorScheme === "dark" ? "#fff" : "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    height: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
