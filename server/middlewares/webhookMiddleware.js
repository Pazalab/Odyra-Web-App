import asyncHandler from 'express-async-handler';
import express from "express"

export const webhookSort = asyncHandler(async(req, res, next) => {
      if(req.originalUrl === "/api/v1/client/stripe-webhook"){
            express.raw({ type: "application/json"})(req, res, next);
      }else{
            express.json()(req, res, next);
      }
})