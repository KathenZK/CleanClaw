import { permanentRedirect } from "next/navigation";
import { defaultLang } from "@/lib/i18n";

export default function DownloadRedirectPage() {
  permanentRedirect(`/${defaultLang}/download`);
}
