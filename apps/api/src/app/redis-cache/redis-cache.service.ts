import { ConfigurationService } from '@ghostfolio/api/services/configuration/configuration.service';
import { UniqueAsset } from '@ghostfolio/common/interfaces';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  public constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configurationService: ConfigurationService
  ) {}

  public async get(key: string): Promise<string> {
    return await this.cache.get(key);
  }

  public getQuoteKey({ dataSource, symbol }: UniqueAsset) {
    return `quote-${dataSource}-${symbol}`;
  }

  public async remove(key: string) {
    await this.cache.del(key);
  }

  public async reset() {
    await this.cache.reset();
  }

  public async set(key: string, value: string, ttlInSeconds?: number) {
    await this.cache.set(key, value, {
      ttl: ttlInSeconds ?? this.configurationService.get('CACHE_TTL')
    });
  }
}
