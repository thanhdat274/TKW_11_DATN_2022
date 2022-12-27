import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="background bg-[#01321f] xl:px-[100px]">
        <div className="max-w-full w-[1200px] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-[20px] gap-[30px]  ">
          <div className="px-4">
            <div>
              <img
                src="https://beautyspa4.shostweb.com/wp-content/uploads/2021/12/logo-spa-4.svg"
                alt=""
                width={180}
              />
            </div>
            <p className="pt-[10px] leading-5 text-[#FFFFFF] text-[16px]">
              Một sản phẩm của Tuyến Spa
            </p>
            <p className=" leading-5 text-[#FFFFFF]  text-[16px]">
              Chúng tôi rất hân hạnh được phục vụ bạn!
            </p>
          </div>
          <div className="mr-10 px-4">
            <h4 className="text-[#FFFFFF] text-[17px] ">
              TUYẾN SPA Headcare - Massage - Skincare
            </h4>
            <p className="text-[16px] text-[#FFFFFF] ml-5">
              THẨM MỸ VIỆN TUYẾN SPA
            </p>
            <p className="text-[13px] text-[#FFFFFF]">Tổng đài: 1900 1920</p>
            <p className="text-[13px] text-[#FFFFFF]">Hotline: 0866.824.564</p>
            <p className="text-[13px] text-[#FFFFFF]">contact@tuyenSpa.vn</p>
            <p className="text-[13px] text-[#FFFFFF]">Thẩm Mỹ Tuyến Spa</p>
            <p className="text-[13px] text-[#FFFFFF]">
              tuyenSpa.tm (Thẩm Mỹ Tuyến Spa)
            </p>
          </div>

          <div className=" px-[16px] ">
            <h4 className="text-[#FFFFFF]">HỆ THỐNG THẨM MỸ TUYẾN SPA</h4>
            <p className="text-[25px] text-[#E7C55A] mb-3 sm:mb-5">
              TẠI HẢI DƯƠNG
            </p>
            <div className="px-[0px] sm:px-[20px]">
              <div>
                <p className="text-[16px] text-[#FFFFFF] mb-[5px]">
                  THẨM MỸ VIỆN TUYẾN SPA cơ sở 1
                </p>
                <p className="text-[13px] text-[#FFFFFF]">
                  Số 68, Phố Tuệ Tĩnh, TP.Hải Dương
                </p>
              </div>
              <div>
                <p className="text-[16px] text-[#FFFFFF] mb-[5px]">
                  THẨM MỸ VIỆN TUYẾN SPA cơ sở 2
                </p>
                <p className="text-[13px] text-[#FFFFFF]">
                  Số 12, Đường Trần Phú, Thị Trấn Nam Sách, TP.Hải Dương
                </p>
              </div>
              <div>
                <p className="text-[16px] text-[#FFFFFF] mb-[5px]">
                  THẨM MỸ VIỆN TUYẾN SPA cơ sở 3
                </p>
                <p className="text-[13px] text-[#FFFFFF]">
                  Số 123, Đường Ngô Quyền, TP.Hải Dương
                </p>
              </div>
            </div>
            <p className="text-[25px] text-[#E7C55A] mb-3 sm:mb-5">
              TẠI HÀ NỘI
            </p>
            <div className="px-[0px] sm:px-[40px]">
              <p className="text-[16px] text-[#FFFFFF]  mb-[5px]">
                THẨM MỸ VIỆN TUYẾN SPA
              </p>
              <p className="text-[13px] text-[#FFFFFF]">
                Số 11, Ngõ 66B, Triều Khúc, Hà Đông, TP.Hà Nội
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 bg-[#00502B] text-center text-xs text-[#FFFFFF] ">
        <p className="mb-0">
          Copyright 2022 © Thẩm Mỹ Viện Tuyến Spa | Thiết kế bởi nhóm 11
        </p>
      </div>
    </div>
  );
};

export default Footer;
