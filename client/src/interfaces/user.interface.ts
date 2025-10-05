import type { Account } from './auth.interface';

export interface User {
    id:string
    avata: string | null;
    account: Omit<Account, 'confirmPassword'>;
}
export interface InitialUserProps {
    users: User[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: null | undefined | string;
}
