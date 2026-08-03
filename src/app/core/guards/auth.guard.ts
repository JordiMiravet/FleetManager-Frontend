import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['/auth']);