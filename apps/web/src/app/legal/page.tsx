import { permanentRedirect } from "next/navigation";
import { defaultLang } from "@/lib/i18n";

export default function LegalRedirectPage() {
  permanentRedirect(`/${defaultLang}/legal`);
}
