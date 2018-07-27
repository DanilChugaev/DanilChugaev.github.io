import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: [
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:22:57+03:00',
          'id': 356513588,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'BR',
        },
        'payment_details': {
          'payment': {
            'currency': 'BRL',
            'amount': 0.41,
            'amount_from_ps': 0.41,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'BRL',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 16,
            'name': 'QIWI',
          },
          'transfer_date': '2018-07-06T16:22:31+03:00',
          'id': 356184136,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'e.tes@xsolla.com',
          'phone': 79223812311,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'RUB',
            'amount': 10.64,
            'amount_from_ps': 10.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:18:16+03:00',
          'id': 356511801,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'BR',
        },
        'payment_details': {
          'payment': {
            'currency': 'BRL',
            'amount': 0.41,
            'amount_from_ps': 0.41,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'BRL',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:12:15+03:00',
          'id': 356419413,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'lester.mosley@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 15,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:11:11+03:00',
          'id': 356484848,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'e.tes@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.03,
            'amount_from_ps': 0.03,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.03,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Standart Status',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:11:07+03:00',
          'id': 356497215,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:11:07+03:00',
          'id': 356464504,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T16:11:06+03:00',
          'id': 356476463,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 30498,
            'name': 'God of Peace',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:58:51+03:00',
          'id': 356505464,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'john.uniqe',
          'name': 'John Smith',
          'custom': null,
          'email': 's.urazalieva@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.21,
            'amount_from_ps': 1.21,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': null,
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': 1,
            'currency': 'USD',
            'content': 1,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 3441,
            'name': 'MobileGo',
          },
          'transfer_date': '2018-07-06T15:54:01+03:00',
          'id': 356504348,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'karina.newman',
          'name': 'karina.newman',
          'custom': null,
          'email': 'as.petrov@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'MGO',
            'amount': 16.6447,
            'amount_from_ps': 16.1883,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'MGO',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:53:20+03:00',
          'id': 356504140,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:52:58+03:00',
          'id': 356504039,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T15:52:39+03:00',
          'id': 356503925,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.11,
            'amount_from_ps': 0.11,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:32:04+03:00',
          'id': 356497437,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T15:31:51+03:00',
          'id': 356497368,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.11,
            'amount_from_ps': 0.11,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:19:39+03:00',
          'id': 356493513,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T15:18:39+03:00',
          'id': 356493241,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T14:35:11+03:00',
          'id': 356479710,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T14:33:56+03:00',
          'id': 356479609,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T14:23:39+03:00',
          'id': 356476728,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T14:08:06+03:00',
          'id': 356421705,
          'refund_reason': null,
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'RUB',
            'amount': 10.63,
            'amount_from_ps': 10.63,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T14:07:35+03:00',
          'id': 356472267,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T14:06:20+03:00',
          'id': 356471949,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-06T13:45:15+03:00',
          'id': 356466092,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'xWalletUser',
          'name': 'John Smith',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.12,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T13:38:34+03:00',
          'id': 356464159,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.09,
            'amount_from_ps': 0.09,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T13:37:47+03:00',
          'id': 356463981,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-06T12:34:07+03:00',
          'id': 356448207,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'xWalletUser',
          'name': 'John Smith',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:36:31+03:00',
          'id': 356435553,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'BR',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:36:14+03:00',
          'id': 356435494,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'BR',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:18:10+03:00',
          'id': 356431937,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.5,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:16:22+03:00',
          'id': 356431564,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.12,
            'amount_from_ps': 0.5,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T11:13:05+03:00',
          'id': 356430394,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'sadasdasa',
          'name': 'John Smith',
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.08,
            'amount_from_ps': 0.08,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.06,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:13:05+03:00',
          'id': 356425582,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'sadasdasa',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.07,
            'amount_from_ps': 0.07,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.06,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Standard',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T11:13:05+03:00',
          'id': 356423503,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'lester.mosley@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:51:15+03:00',
          'id': 356426973,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'sadasdasa@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:40:45+03:00',
          'id': 356423672,
          'refund_reason': 'Potential fraud',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'lester.mosley@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T10:37:06+03:00',
          'id': 356422861,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T10:35:06+03:00',
          'id': 356422628,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:34:05+03:00',
          'id': 356422111,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'lester.mosley@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:31:08+03:00',
          'id': 356422116,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'e.tes@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.02,
            'amount_from_ps': 0.02,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:29:00+03:00',
          'id': 356421794,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'lester.mosley',
          'name': 'John Smith',
          'custom': null,
          'email': 'lester.mosley@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:16:05+03:00',
          'id': 356413385,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 15,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:16:05+03:00',
          'id': 356409732,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 15,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:05:08+03:00',
          'id': 356416428,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0.02,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:05:07+03:00',
          'id': 356417646,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0.02,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:05:07+03:00',
          'id': 356417351,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.03,
            'amount_from_ps': 0.03,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 2,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:05:07+03:00',
          'id': 356417042,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.03,
            'amount_from_ps': 0.03,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 2,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T10:05:07+03:00',
          'id': 356416565,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.03,
            'amount_from_ps': 0.03,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 2,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-06T10:03:14+03:00',
          'id': 356417402,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'a.neganova',
          'name': 'Nastya',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:57:56+03:00',
          'id': 356416502,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'neganova.a',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.03,
            'amount_from_ps': 0.03,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 2,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-06T09:57:06+03:00',
          'id': 356416356,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'a.neganova',
          'name': 'Nastya',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 23059,
            'name': 'Half-Life 3',
          },
          'payment_method': {
            'id': 3042,
            'name': 'Webmoney',
          },
          'transfer_date': '2018-07-06T09:43:26+03:00',
          'id': 356414574,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'John Smit',
          'name': null,
          'custom': null,
          'email': 'i.oborin@xsolla.com',
          'phone': null,
          'country': 'JP',
        },
        'payment_details': {
          'payment': {
            'currency': 'JPY',
            'amount': 174,
            'amount_from_ps': 174,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Coins',
          },
          'virtual_items': '1 \u0421hicken Leg',
          'simple_checkout': {
            'amount': 0,
            'currency': 'JPY',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 23059,
            'name': 'Half-Life 3',
          },
          'payment_method': {
            'id': 3431,
            'name': 'Google Pay',
          },
          'transfer_date': '2018-07-06T09:41:39+03:00',
          'id': 356414197,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'John Smit',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.8,
            'amount_from_ps': 1.8,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Coins',
          },
          'virtual_items': '1 \u0421hicken Leg',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 23059,
            'name': 'Half-Life 3',
          },
          'payment_method': {
            'id': 3431,
            'name': 'Google Pay',
          },
          'transfer_date': '2018-07-06T09:40:42+03:00',
          'id': 356413894,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'John Smit',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'BRL',
            'amount': 7.52,
            'amount_from_ps': 7.52,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Coins',
          },
          'virtual_items': '1 \u0421hicken Leg',
          'simple_checkout': {
            'amount': 0,
            'currency': 'BRL',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:37:35+03:00',
          'id': 356413462,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.64,
            'amount_from_ps': 1.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:26:06+03:00',
          'id': 356411945,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'ofelia.meadows',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.07,
            'amount_from_ps': 0.07,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.02,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:25:08+03:00',
          'id': 356411812,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'ofelia.meadows',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.1,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Plan 10 cents',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 356409432,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.64,
            'amount_from_ps': 1.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 356147301,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 355547524,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 28879,
            'name': 'Storefront',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 352063943,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'john.uniqe',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1,
            'amount_from_ps': 1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'q',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 1,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 349612771,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn',
          'name': 'montgomery.quinn',
          'custom': null,
          'email': 'e.polyan25ina@xsolla.com',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.04,
            'amount_from_ps': 0.04,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 349611129,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'vargas.christian',
          'name': 'vargas.christian',
          'custom': null,
          'email': 'e.polyan25ina@xsolla.com',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:15+03:00',
          'id': 347864481,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 356148548,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 351688240,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'tran.mills',
          'name': null,
          'custom': null,
          'email': 'wyatt.melton@andryx.tv',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 351144800,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'jimmie.key@exoteric.biz',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.16,
            'amount_from_ps': 0.16,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'We are the Champions',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 349364862,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'kristin.mcintosh',
          'name': 'kristin.mcintosh',
          'custom': null,
          'email': 'hull.joseph@acrodance.io',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.04,
            'amount_from_ps': 0.04,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 349360869,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn',
          'name': 'montgomery.quinn',
          'custom': null,
          'email': 'tucker.kim@cowtown.info',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.04,
            'amount_from_ps': 0.04,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 349358330,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn2',
          'name': 'montgomery.quinn2',
          'custom': null,
          'email': 'foreman.wolf@recognia.org',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 349346822,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn',
          'name': 'montgomery.quinn',
          'custom': null,
          'email': 'sarah.cannon@illumity.bi',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15570,
            'name': 'Awesome Game 2',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 349296507,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'i.zubov',
          'name': 'Ilya Zubov',
          'custom': null,
          'email': 'i.zubov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.5,
            'amount_from_ps': 0.5,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 ForTest',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 345453434,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 345452417,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 345439826,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'm.thompson',
          'name': 'Montoya Thompson',
          'custom': null,
          'email': 'sarah.cannon@illumity.bi',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'RUB',
            'amount': 4.91,
            'amount_from_ps': 4.91,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 2,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'RUB',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 345239235,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'EUR',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'EUR',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 344690500,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'i.zubov',
          'name': 'Ilya Zubov',
          'custom': null,
          'email': 'i.zubov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'THB',
            'amount': 13.46,
            'amount_from_ps': 13.46,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'THB',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15570,
            'name': 'Awesome Game 2',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:14+03:00',
          'id': 343971517,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': null,
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.1,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Standart Status',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:13+03:00',
          'id': 356139642,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:13+03:00',
          'id': 349608827,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn',
          'name': 'montgomery.quinn',
          'custom': null,
          'email': 'e.polyan0ina@xsolla.com',
          'phone': null,
          'country': 'GB',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.43,
            'amount_from_ps': 0.43,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:13+03:00',
          'id': 349347702,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 1,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'montgomery.quinn2',
          'name': 'montgomery.quinn2',
          'custom': null,
          'email': 'foreman.wolf@recognia.org',
          'phone': null,
          'country': 'MY',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.04,
            'amount_from_ps': 0.04,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:13+03:00',
          'id': 347864984,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'd.rozhkov',
          'custom': null,
          'email': 'd.rozhkov@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': '1 Kawaii~ka',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:12:13+03:00',
          'id': 345186138,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'a.nikulin',
          'name': 'nikulin',
          'custom': null,
          'email': 'a.nikulin@xsolla.com',
          'phone': null,
          'country': 'LV',
        },
        'payment_details': {
          'payment': {
            'currency': 'RUB',
            'amount': 28.04,
            'amount_from_ps': 28.04,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': '1 Rabbit',
          'simple_checkout': {
            'amount': 0,
            'currency': 'RUB',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:11:11+03:00',
          'id': 356409614,
          'refund_reason': null,
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'ofelia.meadows',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.07,
            'amount_from_ps': 0.07,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.02,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:09:31+03:00',
          'id': 356409670,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.64,
            'amount_from_ps': 1.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:07:37+03:00',
          'id': 356409416,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.64,
            'amount_from_ps': 1.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:07:07+03:00',
          'id': 356409358,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 1.64,
            'amount_from_ps': 1.64,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 100,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-06T09:06:52+03:00',
          'id': 356409320,
          'refund_reason': 'Cancellation by the PS request',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'Jack Black',
          'name': 'Jack Black',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 15,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 15070,
            'name': 'Super Farm',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:06:44+03:00',
          'id': 356409292,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'm.sbeglova',
          'name': 'John Smith',
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.08,
            'amount_from_ps': 0.08,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Money',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.06,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Standard',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:05:10+03:00',
          'id': 356409053,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'ofelia.meadows',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.1,
            'amount_from_ps': 0.1,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.1,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'Plan 10 cents',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T09:04:11+03:00',
          'id': 356402612,
          'refund_reason': null,
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'ofelia.meadows',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.16,
            'amount_from_ps': 0.16,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'We are the Champions',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 23059,
            'name': 'Half-Life 3',
          },
          'payment_method': {
            'id': 3042,
            'name': 'Webmoney',
          },
          'transfer_date': '2018-07-06T08:57:36+03:00',
          'id': 356407812,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'John Smit',
          'name': null,
          'custom': null,
          'email': 'i.romanov@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'JPY',
            'amount': 219,
            'amount_from_ps': 219,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Coins',
          },
          'virtual_items': '1 \u0421hicken Leg',
          'simple_checkout': {
            'amount': 0,
            'currency': 'JPY',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 13036,
            'name': 'LiF',
          },
          'payment_method': {
            'id': 3217,
            'name': 'RAZER zGOLD',
          },
          'transfer_date': '2018-07-06T08:33:24+03:00',
          'id': 356404571,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'j.smith@gmail.com',
          'name': 'John Smith',
          'custom': null,
          'email': 'j.smith@gmail.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 2.49,
            'amount_from_ps': 2.49,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 200,
            'name': 'Kredits',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T08:28:04+03:00',
          'id': 356403663,
          'refund_reason': null,
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'john.uniqe',
          'name': 'John Smith',
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.19,
            'amount_from_ps': 0.15,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'We are the Champions',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T08:15:11+03:00',
          'id': 356401753,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.16,
            'amount_from_ps': 0.16,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 18404,
            'name': 'Red Sauce 3',
          },
          'payment_method': {
            'id': 24,
            'name': 'PayPal',
          },
          'transfer_date': '2018-07-06T08:15:11+03:00',
          'id': 356176175,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'e.polyanina',
          'name': null,
          'custom': null,
          'email': 'qualityqontrol@xsolla.com',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.16,
            'amount_from_ps': 0.16,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'gold',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0.16,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': 'We are the Champions',
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 17653,
            'name': 'Gemini',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-05T15:52:06+03:00',
          'id': 356175298,
          'refund_reason': null,
          'status': 'done',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'buy_by_balance',
          'name': null,
          'custom': null,
          'email': 'drake.finley@comverges.info',
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Currency1',
          },
          'virtual_items': '1 Item5',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 17653,
            'name': 'Gemini',
          },
          'payment_method': {
            'id': 1380,
            'name': 'Credit\/Debit Cards',
          },
          'transfer_date': '2018-07-05T15:51:52+03:00',
          'id': 356175322,
          'refund_reason': null,
          'status': 'created',
          'external_id': null,
          'dry_run': 2,
          'is_refund_allowed': 1,
        },
        'user': {
          'id': 'zip_code',
          'name': null,
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0.5,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 0,
            'name': 'Currency1',
          },
          'virtual_items': '1 Item8',
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-05T15:49:33+03:00',
          'id': 355509958,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'a.neganova',
          'name': 'Nastya',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-05T15:49:32+03:00',
          'id': 355517185,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'a.neganova',
          'name': 'Nastya',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'RU',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
      {
        'transaction': {
          'project': {
            'id': 21092,
            'name': 'World of Xsolla',
          },
          'payment_method': {
            'id': 2760,
            'name': 'Your Balance',
          },
          'transfer_date': '2018-07-05T15:49:31+03:00',
          'id': 354223977,
          'refund_reason': 'Test payment',
          'status': 'canceled',
          'external_id': null,
          'dry_run': 0,
          'is_refund_allowed': 0,
        },
        'user': {
          'id': 'a.neganova',
          'name': 'Nastya',
          'custom': null,
          'email': null,
          'phone': null,
          'country': 'US',
        },
        'payment_details': {
          'payment': {
            'currency': 'USD',
            'amount': 0.02,
            'amount_from_ps': 0,
          },
          'sales_tax': {
            'percent': 0,
            'amount': 0,
          },
        },
        'purchase': {
          'virtual_currency': {
            'amount': 1,
            'name': 'Gold coins',
          },
          'virtual_items': null,
          'simple_checkout': {
            'amount': 0,
            'currency': 'USD',
          },
          'pin_codes': {
            'amount': null,
            'currency': null,
            'content': null,
          },
          'subscription': {
            'name': null,
          },
        },
      },
    ],
    typesDataTable: {
      transaction: {
        _current: [
          {
            field: 'id',
            headTable: 'transaction_id',
          },
          {
            field: 'transfer_date',
            headTable: 'Дата перевода',
          },
        ],
        project: [
          {
            field: 'name',
            headTable: 'Проект',
          },
        ],
        payment_method: [
          {
            field: 'name',
            headTable: 'Платежная система',
          },
        ],
      },
      user: {
        _current: [
          {
            field: 'id',
            headTable: 'id пользователя',
          },
          {
            field: 'name',
            headTable: 'Имя',
          },
          {
            field: 'email',
            headTable: 'Email',
          },
        ],
      },
      payment_details: {
        payment: [
          {
            field: 'currency',
            headTable: 'Валюта',
          },
          {
            field: 'amount',
            headTable: 'Сумма',
          },
        ],
      },
      purchase: {
        _current: [
          {
            field: 'virtual_items',
            headTable: 'Виртуальные объекты',
          },
        ],
        virtual_currency: [
          {
            field: 'name',
            headTable: 'Виртуальная валюта',
          },
        ],
      },
    },
  },
  getters: {
    /**
     * Return an array of all transactions
     *
     * @param {Object} state
     *
     * @return {Array} transactions
     * */
    getTransactions (state) {
      return state.transactions
    },
    /**
     * Return an object with the required data types for the table
     *
     * @param {Object} state
     *
     * @return {Object} typesDataTable
     * */
    getTypesDataTable (state) {
      return state.typesDataTable
    },
  },
})
