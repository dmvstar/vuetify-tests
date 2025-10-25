var data = [
    // ===================================
    // applicationid: 1000001 (Records 1-20)
    // ===================================
    {
        "id": 1,
        "datecreated": "2023-10-15 09:12:34.123",
        "datemodified": "2023-10-15 09:12:34.123",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.1",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_a",
            "durationSec": 15
        }
    },
    {
        "id": 2,
        "datecreated": "2023-10-16 14:22:01.456",
        "datemodified": "2023-10-16 14:22:01.456",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.1",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_b",
            "durationSec": 45
        }
    },
    {
        "id": 3,
        "datecreated": "2023-10-17 10:05:55.789",
        "datemodified": "2023-10-17 10:05:55.789",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.1",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_c",
            "durationSec": 90
        }
    },
    {
        "id": 4,
        "datecreated": "2023-10-18 11:30:10.011",
        "datemodified": "2023-10-18 11:30:10.011",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.2",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_d",
            "durationSec": 20
        }
    },
    {
        "id": 5,
        "datecreated": "2023-10-19 16:40:20.334",
        "datemodified": "2023-10-19 16:40:20.334",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.2",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_e",
            "durationSec": 55
        }
    },
    {
        "id": 6,
        "datecreated": "2023-10-20 08:50:30.667",
        "datemodified": "2023-10-20 08:50:30.667",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.2",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_REJECT",
        "payload": {
            "userName": "user_f",
            "durationSec": 120
        }
    },
    {
        "id": 7,
        "datecreated": "2023-10-21 13:00:40.990",
        "datemodified": "2023-10-21 13:00:40.990",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 3,
        "absprodcode": "12.66.45.33.3",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_g",
            "durationSec": 10
        }
    },
    {
        "id": 8,
        "datecreated": "2023-10-22 17:10:51.223",
        "datemodified": "2023-10-22 17:10:51.223",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 3,
        "absprodcode": "12.66.45.33.3",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_h",
            "durationSec": 30
        }
    },
    {
        "id": 9,
        "datecreated": "2023-10-23 09:21:01.556",
        "datemodified": "2023-10-23 09:21:01.556",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 3,
        "absprodcode": "12.66.45.33.3",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_FINALIZE",
        "payload": {
            "userName": "user_i",
            "durationSec": 60
        }
    },
    {
        "id": 10,
        "datecreated": "2023-10-24 14:31:11.889",
        "datemodified": "2023-10-24 14:31:11.889",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 4,
        "absprodcode": "12.66.45.33.4",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_j",
            "durationSec": 12
        }
    },
    {
        "id": 11,
        "datecreated": "2023-10-25 10:41:22.001",
        "datemodified": "2023-10-25 10:41:22.001",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 4,
        "absprodcode": "12.66.45.33.4",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_k",
            "durationSec": 40
        }
    },
    {
        "id": 12,
        "datecreated": "2023-10-26 15:51:32.334",
        "datemodified": "2023-10-26 15:51:32.334",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 4,
        "absprodcode": "12.66.45.33.4",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_l",
            "durationSec": 80
        }
    },
    {
        "id": 13,
        "datecreated": "2023-10-27 11:01:42.667",
        "datemodified": "2023-10-27 11:01:42.667",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.5",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_m",
            "durationSec": 15
        }
    },
    {
        "id": 14,
        "datecreated": "2023-10-28 16:11:53.000",
        "datemodified": "2023-10-28 16:11:53.000",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.5",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_n",
            "durationSec": 45
        }
    },
    {
        "id": 15,
        "datecreated": "2023-10-29 10:22:03.333",
        "datemodified": "2023-10-29 10:22:03.333",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 1,
        "absprodcode": "12.66.45.33.5",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_o",
            "durationSec": 90
        }
    },
    {
        "id": 16,
        "datecreated": "2023-10-30 15:32:13.666",
        "datemodified": "2023-10-30 15:32:13.666",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.6",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_p",
            "durationSec": 20
        }
    },
    {
        "id": 17,
        "datecreated": "2023-10-31 11:42:23.999",
        "datemodified": "2023-10-31 11:42:23.999",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.6",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_r",
            "durationSec": 55
        }
    },
    {
        "id": 18,
        "datecreated": "2023-11-01 16:52:34.332",
        "datemodified": "2023-11-01 16:52:34.332",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 2,
        "absprodcode": "12.66.45.33.6",
        "stepuuid": "e9f0a1b2-c3d4-4e5f-86a7-b8c9d0e1f2a3",
        "stepcode": "STEP_REJECT",
        "payload": {
            "userName": "user_s",
            "durationSec": 120
        }
    },
    {
        "id": 19,
        "datecreated": "2023-11-02 12:02:44.665",
        "datemodified": "2023-11-02 12:02:44.665",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 3,
        "absprodcode": "12.66.45.33.7",
        "stepuuid": "a1b2c3d4-5e6f-40a8-8b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_t",
            "durationSec": 10
        }
    },
    {
        "id": 20,
        "datecreated": "2023-11-03 17:12:54.998",
        "datemodified": "2023-11-03 17:12:54.998",
        "applicationid": 1000001,
        "statecode": "2547887785",
        "programtypeid": 3,
        "absprodcode": "12.66.45.33.7",
        "stepuuid": "4c5d6e7f-8a9b-4c1d-9e2f-3a4b5c6d7e8f",
        "stepcode": "STEP_FINALIZE",
        "payload": {
            "userName": "user_u",
            "durationSec": 60
        }
    },
    // ===================================
    // applicationid: 1000002 (Records 21-40)
    // ===================================
    {
        "id": 21,
        "datecreated": "2023-11-04 13:23:05.331",
        "datemodified": "2023-11-04 13:23:05.331",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.1",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_v",
            "durationSec": 15
        }
    },
    {
        "id": 22,
        "datecreated": "2023-11-05 18:33:15.664",
        "datemodified": "2023-11-05 18:33:15.664",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.1",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_w",
            "durationSec": 45
        }
    },
    {
        "id": 23,
        "datecreated": "2023-11-06 14:43:25.997",
        "datemodified": "2023-11-06 14:43:25.997",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.1",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_x",
            "durationSec": 90
        }
    },
    {
        "id": 24,
        "datecreated": "2023-11-07 19:53:36.330",
        "datemodified": "2023-11-07 19:53:36.330",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.2",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_y",
            "durationSec": 20
        }
    },
    {
        "id": 25,
        "datecreated": "2023-11-08 15:03:46.663",
        "datemodified": "2023-11-08 15:03:46.663",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.2",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_z",
            "durationSec": 55
        }
    },
    {
        "id": 26,
        "datecreated": "2023-11-09 20:13:56.996",
        "datemodified": "2023-11-09 20:13:56.996",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.2",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_REJECT",
        "payload": {
            "userName": "user_aa",
            "durationSec": 120
        }
    },
    {
        "id": 27,
        "datecreated": "2023-11-10 16:24:07.329",
        "datemodified": "2023-11-10 16:24:07.329",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 3,
        "absprodcode": "18.11.22.77.3",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_bb",
            "durationSec": 10
        }
    },
    {
        "id": 28,
        "datecreated": "2023-11-11 21:34:17.662",
        "datemodified": "2023-11-11 21:34:17.662",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 3,
        "absprodcode": "18.11.22.77.3",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_cc",
            "durationSec": 30
        }
    },
    {
        "id": 29,
        "datecreated": "2023-11-12 17:44:27.995",
        "datemodified": "2023-11-12 17:44:27.995",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 3,
        "absprodcode": "18.11.22.77.3",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_FINALIZE",
        "payload": {
            "userName": "user_dd",
            "durationSec": 60
        }
    },
    {
        "id": 30,
        "datecreated": "2023-11-13 22:54:38.328",
        "datemodified": "2023-11-13 22:54:38.328",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 4,
        "absprodcode": "18.11.22.77.4",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_ee",
            "durationSec": 12
        }
    },
    {
        "id": 31,
        "datecreated": "2023-11-14 19:04:48.661",
        "datemodified": "2023-11-14 19:04:48.661",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 4,
        "absprodcode": "18.11.22.77.4",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_ff",
            "durationSec": 40
        }
    },
    {
        "id": 32,
        "datecreated": "2023-11-15 15:14:58.994",
        "datemodified": "2023-11-15 15:14:58.994",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 4,
        "absprodcode": "18.11.22.77.4",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_gg",
            "durationSec": 80
        }
    },
    {
        "id": 33,
        "datecreated": "2023-11-16 20:25:09.327",
        "datemodified": "2023-11-16 20:25:09.327",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.5",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_hh",
            "durationSec": 15
        }
    },
    {
        "id": 34,
        "datecreated": "2023-11-17 16:35:19.660",
        "datemodified": "2023-11-17 16:35:19.660",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.5",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_ii",
            "durationSec": 45
        }
    },
    {
        "id": 35,
        "datecreated": "2023-11-18 21:45:30.000",
        "datemodified": "2023-11-18 21:45:30.000",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 1,
        "absprodcode": "18.11.22.77.5",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_jj",
            "durationSec": 90
        }
    },
    {
        "id": 36,
        "datecreated": "2023-11-19 17:55:40.333",
        "datemodified": "2023-11-19 17:55:40.333",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.6",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_kk",
            "durationSec": 20
        }
    },
    {
        "id": 37,
        "datecreated": "2023-11-20 23:05:50.666",
        "datemodified": "2023-11-20 23:05:50.666",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.6",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_ll",
            "durationSec": 55
        }
    },
    {
        "id": 38,
        "datecreated": "2023-11-21 19:16:00.999",
        "datemodified": "2023-11-21 19:16:00.999",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 2,
        "absprodcode": "18.11.22.77.6",
        "stepuuid": "f0a1b2c3-d4e5-4f6a-97b8-c9d0e1f2a3b4",
        "stepcode": "STEP_REJECT",
        "payload": {
            "userName": "user_mm",
            "durationSec": 120
        }
    },
    {
        "id": 39,
        "datecreated": "2023-11-22 15:26:11.332",
        "datemodified": "2023-11-22 15:26:11.332",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 3,
        "absprodcode": "18.11.22.77.7",
        "stepuuid": "b1c2d3e4-6f7a-41b9-9c0d-2e3f4a5b6c7d",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_nn",
            "durationSec": 10
        }
    },
    {
        "id": 40,
        "datecreated": "2023-11-23 20:36:21.665",
        "datemodified": "2023-11-23 20:36:21.665",
        "applicationid": 1000002,
        "statecode": "9123456780",
        "programtypeid": 3,
        "absprodcode": "18.11.22.77.7",
        "stepuuid": "5d6e7f8a-9b0c-4d2e-8f1a-2b3c4d5e6f7a",
        "stepcode": "STEP_FINALIZE",
        "payload": {
            "userName": "user_oo",
            "durationSec": 60
        }
    },
    // ... (ciąg dalszy rekordów 41-200)
    // Wzór: Każde kolejne 20 rekordów dotyczy kolejnego applicationid (1000003 do 1000010).
    // applicationid 1000003: id 41-60
    // applicationid 1000004: id 61-80
    // applicationid 1000005: id 81-100
    // applicationid 1000006: id 101-120
    // applicationid 1000007: id 121-140
    // applicationid 1000008: id 141-160
    // applicationid 1000009: id 161-180
    // applicationid 1000010: id 181-200
    // Nowe UUID dla każdego applicationid, zmieniające się co 2-3 kroki w ramach tego samego applicationid:

    // Przykładowe rekordy z dalszej części:

    // ===================================
    // applicationid: 1000003 (Records 41-60)
    // ===================================
    {
        "id": 41,
        "datecreated": "2023-11-24 16:46:32.000",
        "datemodified": "2023-11-24 16:46:32.000",
        "applicationid": 1000003,
        "statecode": "8032194567",
        "programtypeid": 2,
        "absprodcode": "33.44.55.66.1",
        "stepuuid": "c2d3e4f5-7a8b-42c1-a0d2-e3f4a5b6c7d8",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_pp",
            "durationSec": 18
        }
    },
    {
        "id": 42,
        "datecreated": "2023-11-25 21:56:42.333",
        "datemodified": "2023-11-25 21:56:42.333",
        "applicationid": 1000003,
        "statecode": "8032194567",
        "programtypeid": 2,
        "absprodcode": "33.44.55.66.1",
        "stepuuid": "c2d3e4f5-7a8b-42c1-a0d2-e3f4a5b6c7d8",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_qq",
            "durationSec": 50
        }
    },
    {
        "id": 43,
        "datecreated": "2023-11-26 18:06:52.666",
        "datemodified": "2023-11-26 18:06:52.666",
        "applicationid": 1000003,
        "statecode": "8032194567",
        "programtypeid": 2,
        "absprodcode": "33.44.55.66.1",
        "stepuuid": "c2d3e4f5-7a8b-42c1-a0d2-e3f4a5b6c7d8",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_rr",
            "durationSec": 100
        }
    },
    // ... (rekordy do id 60)

    // ===================================
    // applicationid: 1000006 (Records 101-120)
    // ===================================
    {
        "id": 101,
        "datecreated": "2024-01-02 10:10:10.000",
        "datemodified": "2024-01-02 10:10:10.000",
        "applicationid": 1000006,
        "statecode": "3216549870",
        "programtypeid": 4,
        "absprodcode": "77.88.99.00.1",
        "stepuuid": "f6a7b8c9-d0e1-4f2a-93b4-c5d6e7f8a9b0",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_zzz",
            "durationSec": 14
        }
    },
    {
        "id": 102,
        "datecreated": "2024-01-03 15:20:20.333",
        "datemodified": "2024-01-03 15:20:20.333",
        "applicationid": 1000006,
        "statecode": "3216549870",
        "programtypeid": 4,
        "absprodcode": "77.88.99.00.1",
        "stepuuid": "f6a7b8c9-d0e1-4f2a-93b4-c5d6e7f8a9b0",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_aaaa",
            "durationSec": 60
        }
    },
    // ... (rekordy do id 120)

    // ===================================
    // applicationid: 1000010 (Records 181-200)
    // ===================================
    {
        "id": 181,
        "datecreated": "2024-02-20 08:00:00.000",
        "datemodified": "2024-02-20 08:00:00.000",
        "applicationid": 1000010,
        "statecode": "1098765432",
        "programtypeid": 3,
        "absprodcode": "90.09.80.08.1",
        "stepuuid": "1a2b3c4d-5e6f-47a8-9b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_qqq",
            "durationSec": 11
        }
    },
    {
        "id": 182,
        "datecreated": "2024-02-21 13:10:10.111",
        "datemodified": "2024-02-21 13:10:10.111",
        "applicationid": 1000010,
        "statecode": "1098765432",
        "programtypeid": 3,
        "absprodcode": "90.09.80.08.1",
        "stepuuid": "1a2b3c4d-5e6f-47a8-9b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_VERIFY",
        "payload": {
            "userName": "user_rrr",
            "durationSec": 35
        }
    },
    {
        "id": 183,
        "datecreated": "2024-02-22 18:20:20.222",
        "datemodified": "2024-02-22 18:20:20.222",
        "applicationid": 1000010,
        "statecode": "1098765432",
        "programtypeid": 3,
        "absprodcode": "90.09.80.08.1",
        "stepuuid": "1a2b3c4d-5e6f-47a8-9b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_APPROVE",
        "payload": {
            "userName": "user_sss",
            "durationSec": 75
        }
    },
    {
        "id": 184,
        "datecreated": "2024-02-23 23:30:30.333",
        "datemodified": "2024-02-23 23:30:30.333",
        "applicationid": 1000010,
        "statecode": "1098765432",
        "programtypeid": 4,
        "absprodcode": "90.09.80.08.2",
        "stepuuid": "5f6e7d8c-9b0a-41d2-a3f4-b5c6d7e8f9a0",
        "stepcode": "STEP_START",
        "payload": {
            "userName": "user_ttt",
            "durationSec": 19
        }
    },
    // ... (aż do rekordu 200)
    {
        "id": 200,
        "datecreated": "2024-03-03 15:59:59.999",
        "datemodified": "2024-03-03 15:59:59.999",
        "applicationid": 1000010,
        "statecode": "1098765432",
        "programtypeid": 1,
        "absprodcode": "90.09.80.08.7",
        "stepuuid": "1a2b3c4d-5e6f-47a8-9b0c-d1e2f3g4h5i6",
        "stepcode": "STEP_FINALIZE",
        "payload": {
            "userName": "user_wwww",
            "durationSec": 58
        }
    }
]
