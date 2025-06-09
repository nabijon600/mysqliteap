import { Stack, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
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
const colorScheme = useColorScheme(); // 'light' yoki 'dark' 08062025

export default function Modaltwo({ title }: Props) {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams(); // id ni olish uchun // expo-router
  const [editMode, setEditMode] = useState(false);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [pasSeria, setPasSeria] = useState("");
  // const [pasNumber, setPasNumber] = useState("");
  // const [adress, setAdress] = useState("");
  // const [phone, setPhone] = useState("");

  const [idDevice, setIdDevice] = useState("device12345");
  const [version, setVersion] = useState("1.0.3");
  const [citizen, setCitizen] = useState("860");
  const [passport, setPassport] = useState("AD5499983");
  const [fullname, setFullname] = useState("Aliyev Alisher Anvarovich");
  const [birthdate, setBirthdate] = useState("1990-06-15");
  const [pinfl, setPinfl] = useState("23423532462456");
  const [address, setAddress] = useState("Toshkent sh., Chilonzor tumani, 5-kvartal, 12-uy");
  const [email, setEmail] = useState("aliyev@example.com");
  const [phone, setPhone] = useState("+998901234567");
  const [password, setPassword] = useState("secureP@ssword123");
  const [confirmType, setConfirmType] = useState("1");
  const [confirmationCode, setConfirmationCode] = useState("654321");
  const [isVerified, setIsVerified] = useState(false); // 0 bo‘lsa false




  const database = useSQLiteContext();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // useEffect(() => {
  //   if (id) {
  //     setEditMode(true);
  //     loadData();
  //   }
  // }, [id]);

  // const loadData = async () => {
  //   const userId = parseInt(id as string);
  //   if (!userId) return;

  //   const result = await database.getFirstAsync<{
  //     name: string;
  //     email: string;
  //   }>("SELECT name, email FROM users WHERE id = ?;", [userId]);

  // if (result) {
  //   setName(result.name);
  //   setEmail(result.email);
  // }
  // };

  // const handleSave = async () => {
  //   if (!isValidEmail(email)) {
  //     alert(t("InvalidEmail"));
  //     return;
  //   }

  //   try {
  //     await database.runAsync(
  //       "INSERT INTO users (name, email) VALUES (?, ?);",
  //       [name, email]
  //     );
  //     alert(t("UserAdded"));
  //     router.back();
  //   } catch (error) {
  //     console.error("Error saving user:", error);
  //     alert(t("SomethingWentWrong"));
  //   }
  // };

  const handleUpdate = async () => {
    //   if (!isValidEmail(email)) {
    //     alert("Iltimos, to'g'ri email manzil kiriting.");
    //     return;
    //   }

    //   try {
    //     const response = await database.runAsync(
    //       "UPDATE users SET name = ?, email = ? WHERE id = ?;",
    //       [name, email, parseInt(id as string)]
    //     );
    //     console.log("Element muvaffaqiyatli yangilandi", response?.changes!);
    //     router.back();
    //   } catch (error) {
    //     console.error("Elementni yangilashda xatolik yuz berdi:", error);
    //   }
  };

  const handleSave = async () => {
    if (!isValidEmail(email)) {
      alert(t("InvalidEmail"));
      return;
    }

    const payload = {
      idDevice,
      version,
      citizen,
      passport,
      fullname,
      birthdate,
      pinfl,
      address,
      email,
      phone,
      password,
      confirmType: Number(confirmType),
      confirmationCode,
      isVerified: isVerified ? 1 : 0,
    };

    try {
      const response = await fetch("https://cargo.customs.uz/mobile/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(t("UserAdded")); // yoki result.message agar API qaytarsa
        router.back();
      } else {
        console.error("Serverdan xatolik:", result);
        alert(result.message || t("SomethingWentWrong"));
      }
    } catch (error) {
      console.error("So‘rovda xatolik:", error);
      alert(t("SomethingWentWrong"));
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
          placeholder="ID Device"
          value={idDevice}
          onChangeText={setIdDevice}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Version"
          value={version}
          onChangeText={setVersion}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Citizen Code"
          value={citizen}
          onChangeText={setCitizen}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Passport"
          value={passport}
          onChangeText={setPassport}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Birthdate (YYYY-MM-DD)"
          value={birthdate}
          onChangeText={setBirthdate}
          style={styles.textInput}
        />

        <TextInput
          placeholder="PINFL"
          value={pinfl}
          onChangeText={setPinfl}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        />

        <TextInput
          placeholder="Confirm Type"
          value={confirmType}
          onChangeText={setConfirmType}
          keyboardType="numeric"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Confirmation Code"
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          keyboardType="numeric"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Is Verified (0 or 1)"
          value={isVerified ? "1" : "0"}
          onChangeText={(val) => setIsVerified(val === "1")}
          keyboardType="numeric"
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
