import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ModalCaptcha() {
  const [selectedOption, setSelectedOption] = useState("");
  const [blankNumber, setBlankNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  // Captcha yaratish
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleCheck = () => {
    if (captchaInput.trim().toUpperCase() === captchaText) {
      alert("✅ Captcha to‘g‘ri!");
    } else {
      alert("❌ Noto‘g‘ri captcha!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Проверка подлинности выданных сертификатов
      </Text>

      <Text style={styles.label}>Заполните указанные поля *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
          dropdownIconColor="#888"
        >
          <Picker.Item label="Выбрать" value="" />
          <Picker.Item label="Сертификат соответствия" value="ED-POT-RES-001" />
          <Picker.Item
            label="Письмо (после установки)"
            value="ED-POT-RES-001_pos"
          />
          <Picker.Item
            label="Решение (по заявке на проведение сертификации)"
            value="ED-POT-RES-001_sm"
          />
          <Picker.Item
            label="Экологический Сертификат"
            value="ED-POT-RES-007"
          />
          <Picker.Item label="Сан-эпид. Заключение" value="ED-POT-RES-009" />
          <Picker.Item
            label="Сертификат для собственных нужд"
            value="ED-POT-RES-011"
          />
          <Picker.Item
            label="Изменение к Сертификату для собственных нужд"
            value="ED-POT-RES-030"
          />
          <Picker.Item
            label="Заключение по локализации"
            value="ED-POT-RES-012"
          />
          <Picker.Item
            label="Изменение к Заключению по локализации"
            value="ED-POT-RES-031"
          />
          <Picker.Item label="Ветеринарное разрешение" value="ED-POT-RES-013" />
          <Picker.Item
            label="Ветеринарное свидетельство (Forma №1)"
            value="ED-POT-RES-014"
          />
          <Picker.Item
            label="Ветеринарное свидетельство (Forma №2)"
            value="ED-POT-RES-015"
          />
          <Picker.Item
            label="Ветеринарное свидетельство (Forma №3)"
            value="ED-POT-RES-016"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5a)"
            value="ED-POT-RES-017"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5b)"
            value="ED-POT-RES-018"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5c)"
            value="ED-POT-RES-019"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5d)"
            value="ED-POT-RES-020"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5e)"
            value="ED-POT-RES-021"
          />
          <Picker.Item
            label="Ветеринарный Сертификат (Форма №5f)"
            value="ED-POT-RES-022"
          />
          <Picker.Item label="Карантинное Разрешение" value="ED-POT-RES-023" />
          <Picker.Item label="АКД" value="ED-POT-RES-024" />
          <Picker.Item label="ФСС" value="ED-POT-RES-025" />
          <Picker.Item
            label="Разрешение на ввоз в РУз продукции, содержащей ОРВ"
            value="ED-POT-RES-003"
          />
          <Picker.Item
            label="Разрешение на вывоз из РУз продукции, содержащей ОРВ"
            value="ED-POT-RES-004"
          />
          <Picker.Item
            label="Разрешение на ввоз в РУз ОРВ"
            value="ED-POT-RES-005"
          />
          <Picker.Item
            label="Разрешение на вывоз из РУз ОРВ"
            value="ED-POT-RES-006"
          />
          <Picker.Item
            label="Разрешение на ввоз радиоэлектронных средств"
            value="ED-POT-RES-041"
          />
        </Picker>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.inputHalf]}
          placeholder="Номер бланка"
          value={blankNumber}
          onChangeText={setBlankNumber}
        />

        <View style={styles.orWrapper}>
          <Text style={styles.orText}>или</Text>
        </View>

        <TextInput
          style={[styles.inputHalf]}
          placeholder="Номер разрешение или сертификат"
          value={certificateNumber}
          onChangeText={setCertificateNumber}
        />
      </View>

      <Text style={[styles.label, { marginTop: 15 }]}>
        Введите код с картинки *
      </Text>

      <View style={styles.captchaRow}>
        <View style={styles.captchaBox}>
          <Text style={styles.captchaText}>{captchaText}</Text>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={generateCaptcha}
        >
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.captchaInput}
          placeholder="Введите код с картинки..."
          value={captchaInput}
          onChangeText={setCaptchaInput}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ccc" }]}
          onPress={() => {
            setBlankNumber("");
            setCertificateNumber("");
            setCaptchaInput("");
            generateCaptcha();
          }}
        >
          <Text style={styles.buttonText}>Сброс</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={handleCheck}
        >
          <Text style={styles.buttonText}>ПРОВЕРИТЬ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    height: 44, // optimal balandlik
    justifyContent: "center", // matnni markazga
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: "hidden",
  },

  picker: {
    fontSize: 14,
    color: "#000",
    height: Platform.OS === "android" ? 50 : undefined,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputTwo: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 0,
  },
  captchaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 15,
  },
  captchaImage: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 5,
  },
  refreshButton: {
    paddingHorizontal: 5,
  },

  captchaBox: {
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  captchaText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    letterSpacing: 2,
  },
  refreshIcon: {
    fontSize: 22,
  },

  captchaInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  button: {
    flex: 1,
    height: 44, // <-- inputlar bilan bir xil balandlik
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  inputHalf: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },

  orWrapper: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  orText: {
    fontSize: 13,
    color: "#444",
  },
});
