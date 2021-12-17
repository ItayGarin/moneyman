import "dotenv/config";
import { subDays } from "date-fns";
import { AccountConfig } from "./types";

const {
  DAYS_BACK,
  ACCOUNTS_JSON,
  TELEGRAM_API_KEY,
  TELEGRAM_CHAT_ID,
  GOOGLE_SHEET_ID,
  WORKSHEET_NAME,
  ACCOUNTS_TO_SCRAPE = "",
} = process.env;

const accountsToScrape = ACCOUNTS_TO_SCRAPE.split(",")
  .map((a) => a.trim())
  .filter(Boolean);

export { TELEGRAM_API_KEY, TELEGRAM_CHAT_ID, GOOGLE_SHEET_ID, WORKSHEET_NAME };
export const startDate = subDays(Date.now(), Number(DAYS_BACK));

export const accounts = (
  JSON.parse(ACCOUNTS_JSON) as Array<AccountConfig>
).filter(
  (account) =>
    accountsToScrape.length == 0 || accountsToScrape.includes(account.companyId)
);

export const FileHeaders = [
  "date",
  "amount",
  "description",
  "memo",
  "category",
  "account",
  "hash",
];
