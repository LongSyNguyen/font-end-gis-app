import infor1 from "./../../assets/images/1.png";
import infor2 from "./../../assets/images/2.png";
import infor3 from "./../../assets/images/3.png";
import "./HomeBody.scss";

function HomeBody() {
  return (
    <div className="homebody">
      <div className="homebody-web-intro">
        <div className="homebody-web-intro__content">
          <p className="homebody-web-intro__content-title">
            CUNG CẤP THÔNG TIN
          </p>
          <div>
            Chức năng tự động cảnh báo, dự báo được tích hợp vào WebGIS. Khi các
            thông số chất lượng nước dự báo vượt qua các giới hạn cho phép, phần
            mềm sẽ tự động hiển thị cảnh báo tại vị trí quan trắc vượt giới hạn.
            Chức năng hỗ trợ xuất dữ liệu dạng bảng số liệu hoặc biểu đồ cũng
            được tích hợp tự động từ cơ sở dữ liệu trực tuyến. Từ đó, các cán bộ
            địa phương có thể ban hành các báo cáo hoặc thông báo nhanh chóng
            hơn.
          </div>
        </div>
        <img src={infor1} alt="img" />
      </div>
      <div className="homebody-web-intro">
        <div className="homebody-web-intro__content">
          <p className="homebody-web-intro__content-title">
            HỖ TRỢ RA QUYẾT ĐỊNH
          </p>
          <div>
            Chức năng tự động cảnh báo, dự báo được tích hợp vào WebGIS. Khi các
            thông số chất lượng nước dự báo vượt qua các giới hạn cho phép, phần
            mềm sẽ tự động hiển thị cảnh báo tại vị trí quan trắc vượt giới hạn.
            Chức năng hỗ trợ xuất dữ liệu dạng bảng số liệu hoặc biểu đồ cũng
            được tích hợp tự động từ cơ sở dữ liệu trực tuyến. Từ đó, các cán bộ
            địa phương có thể ban hành các báo cáo hoặc thông báo nhanh chóng
            hơn.
          </div>
        </div>
        <img src={infor2} alt="img" />
      </div>
      <div className="homebody-web-intro">
        <div className="homebody-web-intro__content">
          <p className="homebody-web-intro__content-title">
            HỆ THỐNG ĐA CHỨC NĂNG
          </p>
          <div>
            Chức năng tự động cảnh báo, dự báo được tích hợp vào WebGIS. Khi các
            thông số chất lượng nước dự báo vượt qua các giới hạn cho phép, phần
            mềm sẽ tự động hiển thị cảnh báo tại vị trí quan trắc vượt giới hạn.
            Chức năng hỗ trợ xuất dữ liệu dạng bảng số liệu hoặc biểu đồ cũng
            được tích hợp tự động từ cơ sở dữ liệu trực tuyến. Từ đó, các cán bộ
            địa phương có thể ban hành các báo cáo hoặc thông báo nhanh chóng
            hơn.
          </div>
        </div>
        <img className="function" src={infor3} alt="img" />
      </div>
    </div>
  );
}

export default HomeBody;
