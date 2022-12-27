import { Router } from "express";
let router =  Router()
import {createVoucher, detailVoucher, listVoucher, removeVoucher, updateVoucher, useVoucher} from '../controllers/voucher'

router.post('/voucher/add',createVoucher)
router.get('/vouchers',listVoucher)
router.get('/voucher/:id',detailVoucher)
router.put('/voucher/update/:id',updateVoucher)
router.delete('/voucher/delete/:id',removeVoucher)
router.post('/use-voucher/:id',useVoucher)
export default router