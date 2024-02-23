import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _headers = { 'x-api-key': '4cfFg0QL0dDXuKG1' };
    private readonly _mint = '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs';

    getAccount(publicKey: string | null | undefined) {
        if (!publicKey) {
            return of(null);
        }

        const url = new URL('https://api.shyft.to/sol/v1/wallet/token_balance');

        url.searchParams.append('network', 'mainnet-beta');
        url.searchParams.append('wallet', publicKey);
        url.searchParams.append('token', this._mint);

        return this._httpClient
            .get<{ result: { balance: number; info: { name: string, image: string } }}>(
                url.toString(),
                { headers: this._headers }
            )
            .pipe(map(({ result }) => result));
    }

    getTransactions(publicKey: string | null | undefined) {
        if (!publicKey) {
            return of([]);
        }

        const url = new URL('https://api.shyft.to/sol/v1/transaction/history');

        url.searchParams.append('network', 'mainnet-beta');
        url.searchParams.append('tx_num', '5');
        url.searchParams.append('account', publicKey);

        return this._httpClient
            .get<{ result: { status: string; type: string; timestamp: string; actions: { info: { sender: string, receiver: string, amount: number } }[] }[] }>(
                url.toString(),
                { headers: this._headers }
            )
            .pipe(map(({ result }) => result));
    }
}