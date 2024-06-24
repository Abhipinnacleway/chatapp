import { Inject, Injectable } from "@nestjs/common";
import { Observer } from "rxjs";
import * as Socket from 'ws'

export class WsService {
    async sendMessage(ws:Socket) {
        return 'hello'
    }
}