import { APIRequestContext, APIResponse, request } from '@playwright/test';


export class APIUtils {

    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createContact(data?: {
        'contact_name': string,
        'gender'?: string,
        'status'?: string,
        'company'?: string
    }): Promise<{response: APIResponse, payload: any}> {

        const payload = {
            "contact_name": data?.contact_name ? data.contact_name : "From The Auto-Mate",
            "email": "jane@demo.com",
            "phone": "9998887777",
            "company": data?.company ?? "The Auto-Mate",
            "gender": data?.gender ?? "female",
            "status": data?.status ?? "pending",
            "source": "referral",
            "lead_score": 90,
            "deals": 2,
            "total_value": 25000,
            "services": ["crm", "support"],
            "priority": "medium",
            "last_contact": "2025-11-08",
            "notes": "Requested follow-up next week."
        };

        const response = await this.request.post('https://theauto-mate.com/crm/automationcrm/src/api/add_contact.php', {
            'headers': {
                'Content-Type': 'application/json'
            },
            'data': payload
        });

        return { response, payload };
    }
}