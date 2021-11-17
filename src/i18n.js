import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "basicStepLabel": "Basic",
            "optionalStepLabel": "Optional",
            "confirmStepLabel": "Confirm",
            "errorRequired": "This field is required",
            "errorPostData": "Failed to send form data. Please wait a moment and try again",
            "errorMatchTextBox": "Please enter half-width alphanumeric characters",
            "checkBoxLabel": "Check Box",
            "checkRequired": "Check required",
            "selectRequired": "Select required",
            // eslint-disable-next-line
            "limitCharacter": "${max} or less",
            "textBoxPlaceholder": "Placeholder",
            "textBoxLabel": "Text Field",
            "pullDownLabel": "Pull Down List",
            "nextButtonLabel": "Next",
            "backButtonLabel": "Back",
            "submitButtonLabel": "Submit",
            "multilineTextLabel": "Remarks",
            "multilineTextTooltipTitle": "Free input field",
            "multilineTextPlaceHolder": "if you have any other requests, please fill in.",
            "selectOne": "One",
            "selectTwo": "Two",
            "selectThree": "Three",
            "boxChecked": "Checked",
            "boxNotChecked": "Not Checked",
            "fieldNoInput": "Not Input",
            "tableHeaderItemColumn": "Field Name",
            "tableHeaderInputColumn": "Your Input"
        }
    },
    ja: {
        translation: {
            "basicStepLabel": "基本項目",
            "optionalStepLabel": "任意項目",
            "confirmStepLabel": "入力確認",
            "errorRequired": "必須項目です",
            "errorPostData": "データの送信に失敗しました。少し待ってからリトライしてください",
            "errorMatchTextBox": "半角英数字記号以外は使用できません",
            "checkBoxLabel": "チェックボックス",
            "checkRequired": "チェックが必要です",
            "selectRequired": "いずれかを選択してください",
            // eslint-disable-next-line
            "limitCharacter": "${max} 文字以下で入力してください",
            "textBoxPlaceholder": "プレースホルダー",
            "textBoxLabel": "テキストフィールド",
            "pullDownLabel": "プルダウンリスト",
            "nextButtonLabel": "次へ",
            "backButtonLabel": "戻る",
            "submitButtonLabel": "送信",
            "multilineTextLabel": "備考欄",
            "multilineTextTooltipTitle": "自由に記入することができます",
            "multilineTextPlaceHolder": "その他ご要望等あれば、ご記入ください",
            "selectOne": "選択肢1",
            "selectTwo": "選択肢2",
            "selectThree": "選択肢3",
            "boxChecked": "チェックしました",
            "boxNotChecked": "チェックしていません",
            "fieldNoInput": "未入力",
            "tableHeaderItemColumn": "入力項目",
            "tableHeaderInputColumn": "入力内容"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ja",
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;